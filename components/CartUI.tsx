"use client";

import { useEffect } from "react";
import { useCart } from "./CartProvider";

export default function CartUI() {
  const {
    items,
    subtotal,
    isOpen,
    closeCart,
    inc,
    dec,
    remove,
    clear,
    toastName,
    modal,
    showModal,
    closeModal,
  } = useCart();

  // Lock scroll while the drawer is open
  useEffect(() => {
    document.body.style.overflow = isOpen || modal ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, modal]);

  // Close drawer / modal on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (modal) closeModal();
      else if (isOpen) closeCart();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, modal, closeCart, closeModal]);

  function checkout() {
    if (!items.length) return;
    closeCart();
    clear();
    showModal({
      title: "Order Confirmed",
      msg: "Thank you for shopping Bare Roots. A confirmation would be sent to your email.",
      demo: true,
    });
  }

  return (
    <>
      {/* OVERLAY + DRAWER */}
      <div
        className={`overlay${isOpen ? " on" : ""}`}
        onClick={closeCart}
        aria-hidden="true"
      />
      <aside
        className={`drawer${isOpen ? " on" : ""}`}
        aria-label="Shopping bag"
        aria-hidden={!isOpen}
      >
        <div className="drawer-hd">
          <h3>Your Bag</h3>
          <button className="x" onClick={closeCart} aria-label="Close bag">
            ×
          </button>
        </div>
        <div className="cart-items">
          {items.length === 0 ? (
            <div className="cart-empty">
              <div className="em">Your bag is empty</div>
              Add a little luxury to get started.
            </div>
          ) : (
            items.map((it) => (
              <div className="ci" key={it.key}>
                <div
                  className="cimg"
                  style={{
                    backgroundImage: it.img
                      ? `url('${it.img}')`
                      : "linear-gradient(150deg,#372C41,#2E3F28)",
                  }}
                />
                <div className="cinfo">
                  <h5>{it.n}</h5>
                  <div className="cp">${it.p.toFixed(2)}</div>
                  <div className="qty">
                    <button onClick={() => dec(it.key)} aria-label={`Decrease ${it.n}`}>
                      −
                    </button>
                    <span>{it.q}</span>
                    <button onClick={() => inc(it.key)} aria-label={`Increase ${it.n}`}>
                      +
                    </button>
                  </div>
                  <button className="rm" onClick={() => remove(it.key)}>
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="drawer-ft">
          <div className="tot">
            <span>Subtotal</span>
            <b>${subtotal.toFixed(2)}</b>
          </div>
          <small>Taxes & shipping calculated at checkout</small>
          <button className="btn btn-gold" onClick={checkout} disabled={!items.length}>
            Checkout
          </button>
        </div>
      </aside>

      {/* MODAL */}
      {modal && (
        <div className="modal" onClick={closeModal} role="dialog" aria-modal="true">
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="seal">✓</div>
            <h3>{modal.title}</h3>
            <p>{modal.msg}</p>
            <button className="btn btn-dark" onClick={closeModal}>
              Continue
            </button>
            {modal.demo && (
              <div className="demo-note">Demo experience — no payment processed</div>
            )}
          </div>
        </div>
      )}

      {/* TOAST */}
      <div className={`toast${toastName ? " on" : ""}`} role="status" aria-live="polite">
        Added to bag <b>·</b> <span>{toastName}</span>
      </div>
    </>
  );
}
