
"use client"

// Presentation Layer
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full bg-neutral-50 p-6 text-neutral-800 md:py-12 mt-12 print:hidden">
        <div className="flex flex-row flex-wrap max-w-7xl justify-center gap-16 text-sm justify-between w-full mx-auto px-8">
            <div className="">
                <div className="flex w-full max-w-sm flex-col gap-2">
                    <h3 className="font-semibold">Subscribe to our newsletter</h3>
                    <form className="flex gap-x-2" action="javascript:throw new Error('React form unexpectedly submitted.')">
                        <input type="email" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm max-w-lg flex-1" placeholder="Enter your email" required name="email" />
                        <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 w-24 rounded-full" type="submit">Subscribe</button>
                    </form>
                </div>
            </div>
            <nav className="grid grid-cols-2 gap-16">
                <section>
                    <h3 className="mb-2 font-semibold">Products</h3>
                    <ul role="list" className="grid gap-1">
                        <li>
                            <Link className="underline-offset-4 hover:underline" href="/category/apparel">Apparel</Link>
                        </li>
                        <li>
                            <Link className="underline-offset-4 hover:underline" href="/category/accessories">Accessories</Link>
                        </li>
                    </ul>
                </section>
                <section>
                    <h3 className="mb-2 font-semibold">Support</h3>
                    <ul role="list" className="grid gap-1">
                        <li>
                            <Link className="underline-offset-4 hover:underline" href="https://yournextstore.com/#features">Features</Link>
                        </li>
                        <li>
                            <Link className="underline-offset-4 hover:underline" href="https://yournextstore.com/#pricing">Pricing</Link>
                        </li>
                        <li>
                            <Link className="underline-offset-4 hover:underline" href="mailto:hi@yournextstore.com">Contact Us</Link>
                        </li>
                    </ul>
                </section>
            </nav>
        </div>
        <div className="flex flex-row flex-wrap max-w-7xl justify-center gap-16 text-sm justify-between w-full mx-auto px-8 mt-8">
            <div>
                <p>© {new Date().getFullYear()} Valerie</p>
                <p>Streetwear for Men</p>
            </div>
            <div className="flex items-center gap-4">
                <Link className="inline-flex items-center gap-1 transition-colors hover:text-neutral-700" href="https://x.com/zaiste">
                    <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 596 596" fill="none">
                        <path fill="#fff" d="m1 19 230 307L0 577h52l203-219 164 219h177L353 252 568 19h-52L329 221 179 19H1Zm77 38h82l359 481h-81L78 57Z"></path>
                    </svg><span className="sr-only">Twitter</span>
                </Link>
                <Link className="inline-flex items-center gap-1 transition-colors hover:text-neutral-700" href="https://x.com/typeofweb">
                    <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 596 596" fill="none">
                        <path fill="#fff" d="m1 19 230 307L0 577h52l203-219 164 219h177L353 252 568 19h-52L329 221 179 19H1Zm77 38h82l359 481h-81L78 57Z"></path>
                    </svg>
                    <span className="sr-only">Twitter</span>
                </Link>
            </div>
        </div>
    </footer>
  )
}

export default Footer;