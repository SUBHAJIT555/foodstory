"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/data/products";
import { useCommerce } from "@/store/CommerceProvider";

const pickupSlots = ["Today, 4–8 pm", "Tomorrow, 10 am–1 pm", "Tomorrow, 4–8 pm"] as const;
const payments = ["UPI", "Card", "Cash on Pickup"] as const;

export function CheckoutView() {
  const { cart, subtotal, itemCount } = useCommerce();
  const [notice, setNotice] = useState("");
  const [slot, setSlot] = useState<(typeof pickupSlots)[number]>(pickupSlots[0]);
  const [payment, setPayment] = useState<(typeof payments)[number]>(payments[0]);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    if (cart.length === 0) {
      setNotice("Your cart is empty.");
      return;
    }
    setNotice("Payment is not connected in this frontend. Your order was not placed.");
  }

  return (
    <div className="bg-page pb-16">
      <div className="mx-auto grid max-w-7xl gap-8 px-3 py-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(20rem,0.8fr)] lg:px-2">
        <form className="space-y-8" onSubmit={onSubmit}>
          <section className="rounded-xl bg-white p-4 md:p-6">
            <p className="text-xs font-semibold tracking-wide text-muted uppercase">STEP 1 | ADDRESS</p>
            <h2 className="mt-2 text-lg font-semibold">Enter The Billing Address</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <label className="text-sm">
                Receiver First Name
                <input required name="firstName" className="mt-1 w-full rounded-md border border-black/15 px-3 py-2" placeholder="Receiver First Name" />
              </label>
              <label className="text-sm">
                Receiver Last Name
                <input required name="lastName" className="mt-1 w-full rounded-md border border-black/15 px-3 py-2" placeholder="Receiver Last Name" />
              </label>
              <label className="text-sm md:col-span-2">
                Enter Your Phone Number
                <div className="mt-1 flex gap-2">
                  <span className="inline-flex items-center rounded-md border border-black/15 px-3 text-sm">+ 91</span>
                  <input required name="phone" inputMode="numeric" pattern="[0-9]{10}" className="w-full rounded-md border border-black/15 px-3 py-2" placeholder="Enter Your Phone Number" />
                </div>
              </label>
              <label className="text-sm md:col-span-2">
                Email
                <input required type="email" name="email" className="mt-1 w-full rounded-md border border-black/15 px-3 py-2" placeholder="Email" />
              </label>
              <label className="text-sm md:col-span-2">
                Enter your full address
                <input required name="address" className="mt-1 w-full rounded-md border border-black/15 px-3 py-2" placeholder="Enter your full address" />
              </label>
              <label className="text-sm">
                Pincode
                <input required name="pincode" inputMode="numeric" pattern="[0-9]{6}" className="mt-1 w-full rounded-md border border-black/15 px-3 py-2" placeholder="Pincode" />
              </label>
              <label className="text-sm">
                City
                <input required name="city" className="mt-1 w-full rounded-md border border-black/15 px-3 py-2" placeholder="City" />
              </label>
            </div>
            <button type="button" className="btn primary-btn mt-4 h-[52px] w-full md:w-[350px]">
              SAVE BILLING ADDRESS DETAILS
            </button>
          </section>

          <section className="rounded-xl bg-white p-4 md:p-6">
            <p className="text-xs font-semibold tracking-wide text-muted uppercase">STEP 2 | CHOOSE PICKUP TIME</p>
            <div className="mt-4 space-y-2">
              {pickupSlots.map((option) => (
                <label key={option} className="flex items-center gap-2 text-sm">
                  <input type="radio" name="slot" checked={slot === option} onChange={() => setSlot(option)} />
                  {option}
                </label>
              ))}
            </div>
          </section>

          <section className="rounded-xl bg-white p-4 md:p-6">
            <p className="text-xs font-semibold tracking-wide text-muted uppercase">STEP 3 | SELECT PAYMENT METHOD</p>
            <div className="mt-4 space-y-2">
              {payments.map((option) => (
                <label key={option} className="flex items-center gap-2 text-sm">
                  <input type="radio" name="payment" checked={payment === option} onChange={() => setPayment(option)} />
                  {option}
                </label>
              ))}
            </div>
            <button type="submit" className="btn primary-btn mt-4 h-[52px] w-full md:w-[350px]">
              Continue to payment
            </button>
            {notice ? <p className="mt-3 text-sm text-error">{notice}</p> : null}
          </section>
        </form>

        <aside className="h-max rounded-xl bg-white p-4 md:sticky md:top-24 md:p-6">
          {cart.length === 0 ? (
            <div className="space-y-3 text-center">
              <h2 className="text-2xl font-semibold">Your cart is empty</h2>
              <Link href="/shop/" className="btn primary-btn inline-flex h-[52px] w-full px-4 md:w-[350px]">
                Shop Your Favourite Foods
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Order summary</h2>
              <ul className="divide-y divide-black/10">
                {cart.map((item) => (
                  <li key={item.key} className="flex gap-3 py-3">
                    <Link href={item.href} className="relative size-16 shrink-0 overflow-hidden rounded-md bg-product-well">
                      {item.image ? <Image src={item.image} alt={item.name} fill className="object-contain" sizes="64px" /> : null}
                    </Link>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold">{item.name}</p>
                      {item.variant !== "default" ? <p className="text-xs text-muted">{item.variant}</p> : null}
                      <p className="text-xs text-muted">Qty {item.quantity}</p>
                    </div>
                    <p className="text-sm font-bold">{formatPrice(item.unitPrice * item.quantity)}</p>
                  </li>
                ))}
              </ul>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal · {itemCount} {itemCount === 1 ? "item" : "items"}</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Pickup</span>
                  <span>{formatPrice(0)}</span>
                </div>
                <div className="flex justify-between text-base font-semibold">
                  <span>Total</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
