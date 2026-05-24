

const CHAPA_BASE_URL = process.env.CHAPA_BASE_URL || "https://api.chapa.co/v1";
const CHAPA_PUBLIC_KEY = process.env.CHAPA_PUBLIC_KEY;
const CHAPA_SECRET_KEY = process.env.CHAPA_SECRET_KEY;
const CHAPA_CALLBACK_URL = process.env.CHAPA_CALLBACK_URL;

class PaymentGatewayService {
  constructor() {
    this.FEE_PERCENTAGE = 0.07; // 7%
  }

  calculateFees(amount) {
    const amountNum = Number(amount);
    const platform_fee = amountNum * this.FEE_PERCENTAGE;
    const net_amount = amountNum - platform_fee;
    return {
      platform_fee: platform_fee.toFixed(2),
      net_amount: net_amount.toFixed(2)
    };
  }

  async initializePayment(provider, params) {
    switch (provider) {
      case "chapa":
      case "chapa_hosted":
        return this.initializeChapa(params);
      case "telebirr":
        return this.initializeTelebirr(params);
      case "cbe_birr":
        return this.initializeCbeBirr(params);
      default:
        throw new Error(`Unsupported payment provider: ${provider}`);
    }
  }

  async verifyPayment(provider, txRef) {
    switch (provider) {
      case "chapa":
      case "chapa_hosted":
        return this.verifyChapa(txRef);
      case "telebirr":
        return this.verifyTelebirr(txRef);
      case "cbe_birr":
        return this.verifyCbeBirr(txRef);
      default:
        throw new Error(`Unsupported payment provider: ${provider}`);
    }
  }

  // --- CHAPA ---
  async initializeChapa({ amount, currency, email, first_name, last_name, tx_ref, return_url, phone_number, title, description, hosted }) {
    if (!CHAPA_SECRET_KEY || !CHAPA_PUBLIC_KEY) {
      const err = new Error("Chapa keys must be configured");
      err.status = 500;
      throw err;
    }

    if (hosted) {
      const fields = {
        public_key: CHAPA_PUBLIC_KEY,
        tx_ref,
        amount,
        currency,
        email,
        first_name: first_name || "User",
        last_name: last_name || "User",
        title: title || "StartupConnect",
        description: description || "Payment",
        return_url,
      };
      if (CHAPA_CALLBACK_URL) fields.callback_url = CHAPA_CALLBACK_URL;
      if (phone_number) fields.phone_number = phone_number;

      return {
        checkout_url: `${CHAPA_BASE_URL}/hosted/pay`,
        form_fields: fields
      };
    }

    const payload = {
      amount,
      currency,
      email,
      first_name: first_name || "User",
      last_name: last_name || "User",
      tx_ref,
      return_url,
      customization: { title: title || "StartupConnect", description },
    };
    if (phone_number) payload.phone_number = phone_number;
    if (CHAPA_CALLBACK_URL) payload.callback_url = CHAPA_CALLBACK_URL;

    const res = await fetch(`${CHAPA_BASE_URL}/transaction/initialize`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${CHAPA_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || data.status !== "success") {
      const err = new Error("Chapa rejected checkout initialization");
      err.status = 502;
      err.details = data;
      throw err;
    }

    return { checkout_url: data.data?.checkout_url };
  }

  async verifyChapa(txRef) {
    if (!CHAPA_SECRET_KEY) throw new Error("Chapa secret key missing");
    const res = await fetch(`${CHAPA_BASE_URL}/transaction/verify/${encodeURIComponent(txRef)}`, {
      headers: { Authorization: `Bearer ${CHAPA_SECRET_KEY}` },
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      const err = new Error(data.message || "Unable to verify Chapa payment");
      err.status = 502;
      err.details = data;
      throw err;
    }

    const isSuccess = data.status === "success" && data.data?.status === "success";
    const status = isSuccess ? "completed" : data.data?.status === "failed" ? "failed" : "pending";
    
    return {
      status,
      provider_reference: data.data?.reference || data.data?.tx_ref || null,
      details: data
    };
  }

  // --- TELEBIRR (MOCK) ---
  async initializeTelebirr({ amount, currency, tx_ref, return_url }) {
    // Mock Telebirr initialization
    return {
      checkout_url: `https://mock-telebirr.example.com/pay?tx_ref=${txRef}&amount=${amount}`,
      mock: true
    };
  }

  async verifyTelebirr(txRef) {
    // Mock verification - assume success for demonstration
    return {
      status: "completed",
      provider_reference: `tb-${txRef}`,
      details: { mock: true, provider: "telebirr" }
    };
  }

  // --- CBE BIRR (MOCK) ---
  async initializeCbeBirr({ amount, currency, tx_ref, return_url }) {
    return {
      checkout_url: `https://mock-cbebirr.example.com/checkout?ref=${txRef}`,
      mock: true
    };
  }

  async verifyCbeBirr(txRef) {
    return {
      status: "completed",
      provider_reference: `cbe-${txRef}`,
      details: { mock: true, provider: "cbe_birr" }
    };
  }
}

module.exports = new PaymentGatewayService();
