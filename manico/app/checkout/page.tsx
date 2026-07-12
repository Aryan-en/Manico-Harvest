'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cart-store";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ShieldCheck, CreditCard, Smartphone, CheckCircle, ArrowLeft, Loader2, Sparkles } from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total, clearCart } = useCartStore();

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState("");

  const [paymentMethod, setPaymentMethod] = useState("upi"); // default to upi
  const [upiTxnId, setUpiTxnId] = useState("");
  const [upiError, setUpiError] = useState("");
  const [isScannerExpanded, setIsScannerExpanded] = useState(false);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");

  const cartTotal = total();
  const shippingFee = cartTotal >= 499 || cartTotal === 0 ? 0 : 49;
  const discountAmount = Math.round(cartTotal * discount);
  const finalTotal = cartTotal - discountAmount + shippingFee;

  useEffect(() => {
    // If cart is empty and order is not successful, redirect to shop
    if (items.length === 0 && !orderSuccess) {
      const timer = setTimeout(() => {
        router.push("/shop");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [items, orderSuccess, router]);

  function handleApplyPromo() {
    setPromoError("");
    if (promoCode.trim().toUpperCase() === "HARVEST10") {
      setDiscount(0.10);
      setPromoApplied(true);
    } else {
      setPromoError("Invalid discount code");
    }
  }

  function handleRemovePromo() {
    setDiscount(0);
    setPromoApplied(false);
    setPromoCode("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    // Validation for UPI payment ID
    if (paymentMethod === "upi") {
      if (!upiTxnId.trim() || upiTxnId.trim().length !== 12 || !/^\d+$/.test(upiTxnId)) {
        setUpiError("Please enter a valid 12-digit numeric UPI Ref No. / UTR");
        return;
      }
      setUpiError("");
    }

    setIsSubmitting(true);

    // Simulate payment verification & order placement API call
    await new Promise((resolve) => setTimeout(resolve, 2500));

    // Generate random order ID
    const generatedOrderId = "MNC-" + Math.floor(100000 + Math.random() * 900000);
    setOrderId(generatedOrderId);
    setIsSubmitting(false);
    setOrderSuccess(true);
    clearCart();
  }

  if (items.length === 0 && !orderSuccess) {
    return (
      <>
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center py-20 px-4" style={{ background: "var(--color-bg-base)" }}>
          <div className="text-center max-w-md bg-surface p-8 rounded-3xl border" style={{ borderColor: "var(--color-border)", background: "var(--color-bg-surface)" }}>
            <Loader2 className="w-10 h-10 animate-spin mx-auto mb-4" style={{ color: "var(--color-brand-primary)" }} />
            <h1 className="text-2xl font-bold mb-2" style={{ color: "var(--color-brand-primary)" }}>Your Cart is Empty</h1>
            <p className="text-sm text-secondary mb-6">Redirecting you to the shop to browse our products...</p>
            <Link href="/shop" className="inline-flex items-center gap-2 font-semibold text-inverse rounded-full bg-accent hover:bg-accent-hover px-6 py-2.5 text-sm transition-all">
              Go to Shop
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (orderSuccess) {
    return (
      <>
        <Navbar />
        <main className="flex-1 py-16 px-4" style={{ background: "var(--color-bg-base)" }}>
          <div className="max-w-xl mx-auto bg-surface rounded-3xl p-8 sm:p-12 border text-center shadow-xl animate-scale-in" style={{ borderColor: "var(--color-border)", background: "var(--color-bg-surface)" }}>
            <div className="w-20 h-20 rounded-full flex items-center justify-center bg-success-bg text-success mx-auto mb-6">
              <CheckCircle className="w-12 h-12" />
            </div>
            
            <h1 className="text-3xl font-extrabold mb-3" style={{ color: "var(--color-brand-primary)" }}>Order Placed!</h1>
            <p className="text-base text-secondary mb-6">
              Thank you for shopping with us. Your UPI payment transaction is under verification, and we have received your order details.
            </p>

            <div className="bg-subtle p-6 rounded-2xl mb-8 text-left border" style={{ borderColor: "var(--color-border)", background: "var(--color-bg-subtle)" }}>
              <h3 className="font-bold text-sm uppercase tracking-wider mb-3" style={{ color: "var(--color-brand-primary)" }}>Order Details</h3>
              <div className="space-y-2 text-sm text-primary">
                <div className="flex justify-between">
                  <span className="opacity-70">Order ID:</span>
                  <span className="font-bold">{orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-70">Payment Status:</span>
                  <span className="font-semibold text-warning" style={{ color: "var(--color-warning)" }}>Pending Verification</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-70">Estimated Delivery:</span>
                  <span className="font-semibold">3 - 5 Business Days</span>
                </div>
                <div className="flex justify-between border-t pt-2 mt-2" style={{ borderColor: "var(--color-border-strong)" }}>
                  <span className="opacity-70">Delivery Address:</span>
                  <span className="font-semibold text-right max-w-xs">{name}, {address}, {city} - {pincode}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/shop" className="rounded-full font-bold text-inverse bg-accent hover:bg-accent-hover px-8 py-3.5 text-sm transition-all shadow-sm">
                Continue Shopping
              </Link>
              <Link href="/" className="rounded-full font-bold text-primary border border-primary hover:bg-subtle px-8 py-3.5 text-sm transition-all" style={{ borderColor: "var(--color-brand-primary)", color: "var(--color-brand-primary)" }}>
                Go to Home
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 py-12 sm:py-16" style={{ background: "var(--color-bg-base)" }}>
        <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8">
          
          {/* Back button */}
          <Link href="/shop" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary mb-8 hover:opacity-80 transition-opacity" style={{ color: "var(--color-brand-primary)" }}>
            <ArrowLeft size={16} />
            Back to Shop
          </Link>

          <h1 className="text-3xl font-extrabold tracking-tight mb-8" style={{ color: "var(--color-brand-primary)" }}>Secure Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Forms */}
            <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-6">
              
              {/* Contact Information */}
              <div className="bg-surface p-6 sm:p-8 rounded-3xl border" style={{ borderColor: "var(--color-border)", background: "var(--color-bg-surface)" }}>
                <h2 className="text-lg font-bold mb-5 flex items-center gap-2" style={{ color: "var(--color-brand-primary)" }}>
                  <span className="w-1.5 h-6 rounded-full bg-accent" style={{ background: "var(--color-brand-accent)" }} />
                  Contact Information
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-xs font-bold text-secondary uppercase tracking-wider">Email Address</label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="rounded-xl border px-4 py-3 text-sm bg-transparent outline-none transition-colors"
                      style={{ borderColor: "var(--color-border)", color: "var(--color-text-primary)" }}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="phone" className="text-xs font-bold text-secondary uppercase tracking-wider">Phone Number</label>
                    <input
                      id="phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="10-digit mobile number"
                      className="rounded-xl border px-4 py-3 text-sm bg-transparent outline-none transition-colors"
                      style={{ borderColor: "var(--color-border)", color: "var(--color-text-primary)" }}
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-surface p-6 sm:p-8 rounded-3xl border" style={{ borderColor: "var(--color-border)", background: "var(--color-bg-surface)" }}>
                <h2 className="text-lg font-bold mb-5 flex items-center gap-2" style={{ color: "var(--color-brand-primary)" }}>
                  <span className="w-1.5 h-6 rounded-full bg-accent" style={{ background: "var(--color-brand-accent)" }} />
                  Delivery Details
                </h2>
                <div className="space-y-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="text-xs font-bold text-secondary uppercase tracking-wider">Recipient Name</label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Full Name"
                      className="rounded-xl border px-4 py-3 text-sm bg-transparent outline-none transition-colors"
                      style={{ borderColor: "var(--color-border)", color: "var(--color-text-primary)" }}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="address" className="text-xs font-bold text-secondary uppercase tracking-wider">Street Address</label>
                    <input
                      id="address"
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="House No, Building, Street, Area"
                      className="rounded-xl border px-4 py-3 text-sm bg-transparent outline-none transition-colors"
                      style={{ borderColor: "var(--color-border)", color: "var(--color-text-primary)" }}
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="city" className="text-xs font-bold text-secondary uppercase tracking-wider">City</label>
                      <input
                        id="city"
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="City"
                        className="rounded-xl border px-4 py-3 text-sm bg-transparent outline-none transition-colors"
                        style={{ borderColor: "var(--color-border)", color: "var(--color-text-primary)" }}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="state" className="text-xs font-bold text-secondary uppercase tracking-wider">State</label>
                      <input
                        id="state"
                        type="text"
                        required
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        placeholder="State"
                        className="rounded-xl border px-4 py-3 text-sm bg-transparent outline-none transition-colors"
                        style={{ borderColor: "var(--color-border)", color: "var(--color-text-primary)" }}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="pincode" className="text-xs font-bold text-secondary uppercase tracking-wider">Pincode</label>
                      <input
                        id="pincode"
                        type="text"
                        required
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        placeholder="6-digit ZIP"
                        className="rounded-xl border px-4 py-3 text-sm bg-transparent outline-none transition-colors"
                        style={{ borderColor: "var(--color-border)", color: "var(--color-text-primary)" }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="bg-surface p-6 sm:p-8 rounded-3xl border" style={{ borderColor: "var(--color-border)", background: "var(--color-bg-surface)" }}>
                <h2 className="text-lg font-bold mb-5 flex items-center gap-2" style={{ color: "var(--color-brand-primary)" }}>
                  <span className="w-1.5 h-6 rounded-full bg-accent" style={{ background: "var(--color-brand-accent)" }} />
                  Payment Method
                </h2>

                <div className="space-y-4">
                  {/* Option 1: UPI QR Payment (Active) */}
                  <div
                    onClick={() => setPaymentMethod("upi")}
                    className="flex items-start gap-4 p-4 rounded-2xl border cursor-pointer transition-all"
                    style={{
                      borderColor: paymentMethod === "upi" ? "var(--color-brand-primary)" : "var(--color-border)",
                      background: paymentMethod === "upi" ? "rgba(42,70,16,0.02)" : "transparent",
                    }}
                  >
                    <input
                      type="radio"
                      name="payment_method"
                      value="upi"
                      checked={paymentMethod === "upi"}
                      onChange={() => setPaymentMethod("upi")}
                      className="mt-1"
                      style={{ accentColor: "var(--color-brand-primary)" }}
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 font-bold" style={{ color: "var(--color-brand-primary)" }}>
                        <Smartphone size={16} />
                        Scan UPI QR Code (Instant & Fast)
                      </div>
                      <p className="text-xs text-secondary mt-1">Scan using any UPI app (GPay, PhonePe, Paytm, BHIM) and confirm.</p>
                      
                      {/* Embedded QR code container */}
                      {paymentMethod === "upi" && (
                        <div className="mt-5 p-5 rounded-2xl border bg-subtle flex flex-col md:flex-row items-center gap-6 max-w-full animate-scale-in" style={{ borderColor: "var(--color-border)", background: "var(--color-bg-subtle)" }}>
                          <div 
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsScannerExpanded(true);
                            }}
                            className="relative w-44 h-44 rounded-xl overflow-hidden shadow-md shrink-0 bg-white border border-color-border p-1 cursor-zoom-in hover:scale-[1.02] active:scale-[0.98] transition-transform"
                            title="Click to zoom scanner"
                          >
                            <Image
                              src="/images/Scanner.jpeg"
                              alt="Scan to pay"
                              fill
                              className="object-contain"
                              priority
                            />
                          </div>
                          <div>
                            <span className="inline-block text-[10px] font-bold tracking-wider uppercase bg-accent text-inverse px-2 py-0.5 rounded mb-2">
                              Scan & Pay
                            </span>
                            <h4 className="font-bold text-sm" style={{ color: "var(--color-brand-primary)" }}>
                              Scan with GPay, PhonePe, Paytm or BHIM
                            </h4>
                            <p className="text-xs text-secondary mt-1 leading-relaxed max-w-sm">
                              Transfer the exact order total of <strong>₹{finalTotal}</strong>. Once paid, fill in the 12-digit transaction ID / UTR below to confirm your transfer.
                            </p>
                            
                            {/* UPI ref entry */}
                            <div className="mt-4 flex flex-col gap-1.5">
                              <label htmlFor="upiTxnId" className="text-[10px] font-bold text-secondary uppercase tracking-wider">UPI Transaction ID / Ref No. (12 Digits)</label>
                              <input
                                id="upiTxnId"
                                type="text"
                                maxLength={12}
                                value={upiTxnId}
                                onChange={(e) => setUpiTxnId(e.target.value.replace(/\D/g, ''))}
                                placeholder="e.g. 301234567890"
                                className="rounded-lg border px-3 py-2 text-xs bg-white outline-none w-64 max-w-full"
                                style={{ borderColor: "var(--color-border-strong)", color: "var(--color-text-primary)" }}
                              />
                              {upiError && (
                                <span className="text-xs font-medium text-error mt-1" style={{ color: "var(--color-error)" }}>
                                  {upiError}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Option 2: Cards / NetBanking (Mock disabled) */}
                  <div
                    className="flex items-start gap-4 p-4 rounded-2xl border opacity-50 cursor-not-allowed"
                    style={{ borderColor: "var(--color-border)" }}
                  >
                    <input
                      type="radio"
                      name="payment_method"
                      value="card"
                      disabled
                      checked={false}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 font-bold text-secondary">
                        <CreditCard size={16} />
                        Card Payments (Credit / Debit)
                      </div>
                      <p className="text-xs text-secondary mt-1">Temporarily offline for maintenance. Please use UPI payment above.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-full font-bold text-inverse transition-all active:scale-[0.99] flex items-center justify-center gap-2 bg-primary hover:bg-muted py-4 shadow-md hover:shadow-lg disabled:opacity-65"
                style={{
                  background: "var(--color-brand-primary)",
                  boxShadow: "0 4px 14px rgba(42, 70, 16, 0.2)",
                }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Verifying Payment...
                  </>
                ) : (
                  <>
                    <ShieldCheck size={18} />
                    Verify UPI & Place Order
                  </>
                )}
              </button>

            </form>

            {/* Right: Summary */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Order Summary */}
              <div className="bg-surface p-6 sm:p-8 rounded-3xl border sticky top-24" style={{ borderColor: "var(--color-border)", background: "var(--color-bg-surface)" }}>
                <h2 className="text-lg font-bold mb-5 flex items-center gap-2" style={{ color: "var(--color-brand-primary)" }}>
                  Order Summary
                </h2>

                <div className="divide-y" style={{ borderColor: "var(--color-border)" }}>
                  
                  {/* Cart Items List */}
                  <div className="pb-4 space-y-3 max-h-72 overflow-y-auto pr-1">
                    {items.map((item) => (
                      <div key={item.productId} className="flex gap-4 items-center">
                        <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 border" style={{ borderColor: "var(--color-border)", background: "var(--color-bg-base)" }}>
                          {item.image_url ? (
                            <Image
                              src={item.image_url}
                              alt={item.name}
                              fill
                              className="object-contain p-1"
                              sizes="56px"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-xs opacity-40">Pack</div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xs sm:text-sm font-bold truncate text-primary">{item.name}</h3>
                          <p className="text-[10px] sm:text-xs text-secondary mt-0.5" style={{ color: "var(--color-text-secondary)" }}>
                            {item.weight} &middot; Qty {item.quantity}
                          </p>
                        </div>
                        <span className="text-xs sm:text-sm font-bold text-primary">
                          ₹{item.price * item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Promo Input */}
                  <div className="py-4">
                    {promoApplied ? (
                      <div className="flex items-center justify-between bg-success-bg border border-color-success px-4 py-2 rounded-xl text-xs font-semibold text-success animate-scale-in" style={{ borderColor: "var(--color-success)" }}>
                        <span className="flex items-center gap-1.5">
                          <Sparkles size={14} />
                          Promo Code Applied! (10% Off)
                        </span>
                        <button type="button" onClick={handleRemovePromo} className="underline uppercase tracking-wider font-bold">Remove</button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Discount code (HARVEST10)"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          className="flex-1 rounded-xl border px-3 py-2 text-xs bg-transparent outline-none"
                          style={{ borderColor: "var(--color-border)", color: "var(--color-text-primary)" }}
                        />
                        <button
                          type="button"
                          onClick={handleApplyPromo}
                          className="rounded-xl px-4 py-2 text-xs font-bold text-inverse bg-accent hover:bg-accent-hover transition-colors"
                        >
                          Apply
                        </button>
                      </div>
                    )}
                    {promoError && (
                      <span className="text-[10px] font-medium text-error mt-1.5 block" style={{ color: "var(--color-error)" }}>
                        {promoError}
                      </span>
                    )}
                  </div>

                  {/* Pricing break downs */}
                  <div className="py-4 space-y-2.5 text-sm">
                    <div className="flex justify-between text-secondary" style={{ color: "var(--color-text-secondary)" }}>
                      <span>Subtotal</span>
                      <span>₹{cartTotal}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-success">
                        <span>Discount (10%)</span>
                        <span>-₹{discountAmount}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-secondary" style={{ color: "var(--color-text-secondary)" }}>
                      <span>Shipping Fee</span>
                      <span>{shippingFee === 0 ? "FREE" : `₹${shippingFee}`}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg pt-3 border-t text-primary" style={{ borderColor: "var(--color-border)", color: "var(--color-brand-primary)" }}>
                      <span>Total Due</span>
                      <span>₹{finalTotal}</span>
                    </div>
                  </div>

                </div>

                <p className="text-[10px] text-secondary text-center mt-5 leading-normal" style={{ color: "var(--color-text-secondary)" }}>
                  Secure payment verification. Your data is encrypted and handled in compliance with global BaaS protocols.
                </p>
              </div>

            </div>

          </div>

        </div>
      </main>
      <Footer />

      {/* Lightbox / Modal for Expanded QR code */}
      {isScannerExpanded && (
        <div
          className="fixed inset-0 flex items-center justify-center p-4 z-[9999] animate-fade-in"
          style={{ background: "rgba(0, 0, 0, 0.75)" }}
          onClick={() => setIsScannerExpanded(false)}
        >
          <div
            className="relative bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center shadow-2xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={() => setIsScannerExpanded(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-subtle hover:bg-border flex items-center justify-center transition-colors text-2xl"
              style={{ color: "var(--color-text-secondary)", lineHeight: "0" }}
              aria-label="Close scanner zoom"
            >
              &times;
            </button>

            <span 
              className="inline-block text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded mb-3"
              style={{ background: "rgba(219,81,0,0.1)", color: "var(--color-brand-accent)" }}
            >
              UPI Payment QR Code
            </span>
            
            <div className="relative w-full aspect-square max-w-[280px] mx-auto rounded-2xl overflow-hidden border p-1 bg-white mb-4" style={{ borderColor: "var(--color-border)" }}>
              <Image
                src="/images/Scanner.jpeg"
                alt="Zoomed UPI QR Code"
                fill
                className="object-contain"
                priority
              />
            </div>

            <h4 className="font-bold text-lg mb-1" style={{ color: "var(--color-brand-primary)" }}>
              Pay ₹{finalTotal}
            </h4>
            <p className="text-xs text-secondary leading-relaxed">
              Scan using any UPI app (Google Pay, PhonePe, Paytm, BHIM) to complete your transaction.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
