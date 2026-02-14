"use client"

import Link from "next/link"
import { Twitter, Instagram, Linkedin, Facebook, Trophy, Info, InfoIcon } from "lucide-react"

export function Footer() {
    return (
        <footer className="bg-[#101010] text-sm py-32 border-t border-white/5 font-sans">
            <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-8 gap-y-12">

                    {/* Column 1: Products (Multi-section) */}
                    <div className="flex flex-col gap-8">
                        <div>
                            <h3 className="font-bold text-white mb-4">Products</h3>
                            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">Domains</h4>
                            <ul className="space-y-2.5">
                                <FooterLink href="/domains">Domain Name Search</FooterLink>
                                <FooterLink href="/domain-search?query=&tab=pricing">Domain Pricing</FooterLink>
                                <FooterLink href="/domain-search?query=reglook.com&tab=premium">Premium Domains</FooterLink>
                                <FooterLink href="/whois-domain-lookup">Whois Domain Lookup</FooterLink>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">Hosting</h4>
                            <ul className="space-y-2.5">
                                <FooterLink href="/hosting">Web Hosting</FooterLink>
                                <FooterLink href="/xcloud-hosting">Serverless Web Hosting</FooterLink>
                                <FooterLink href="/cdn-and-security">CDN & Security</FooterLink>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">Email</h4>
                            <ul className="space-y-2.5">
                                <FooterLink href="/business-email">Reglook Mail</FooterLink>
                                <FooterLink href="https://mail.reglook.com">Webmail Login</FooterLink>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">Cloud</h4>
                            <ul className="space-y-2.5">
                                <FooterLink href="/virtual-machines">xCloud Virtual Machines</FooterLink>
                                <FooterLink href="/vm-balancer">VM Balancer</FooterLink>
                                <FooterLink href="/cloud-volumes">Cloud Volumes</FooterLink>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">Security</h4>
                            <ul className="space-y-2.5">
                                <FooterLink href="/foundation/whois-and-privacy">Whois & Privacy</FooterLink>
                                <FooterLink href="/foundation/security-center">Security Center</FooterLink>
                            </ul>
                        </div>
                    </div>

                    {/* Column 2: Transfer to Us */}
                    <div className="flex flex-col gap-8">
                        <div>
                            <h3 className="font-bold text-white mb-4">Transfer to Us</h3>
                            <ul className="space-y-2.5">
                                <FooterLink href="/foundation/transfers-and-renewals">Transfer Domains</FooterLink>
                                <FooterLink href="/foundation/transfers-and-renewals">Renewals</FooterLink>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-bold text-white mb-4">Sell & Monetize</h3>
                            <ul className="space-y-2.5">
                                <FooterLink href="/foundation/seller-console">Seller Console</FooterLink>
                                <FooterLink href="/foundation/listings-manager">Listings Manager</FooterLink>
                            </ul>
                        </div>
                    </div>

                    {/* Column 3: Why Reglook */}
                    <div>
                        <h3 className="font-bold text-white mb-4">Why Reglook</h3>
                        <ul className="space-y-2.5">
                            <FooterLink href="/foundation">Foundation™</FooterLink>
                            <FooterLink href="/foundation/audit-logs">Audit Logs</FooterLink>
                            <FooterLink href="/foundation/domain-manager">Next-level Domain Management</FooterLink>
                            <FooterLink href="/foundation/via-assistant">VIA AI Assistant</FooterLink>
                        </ul>
                    </div>

                    {/* Column 4: Customer Service */}
                    <div>
                        <h3 className="font-bold text-white mb-4">Customer Service</h3>
                        <ul className="space-y-2.5 mb-6">
                            <FooterLink href="/contact">Contact Us</FooterLink>
                            {/* <FooterLink href="/status">Status</FooterLink> */}
                            {/* <FooterLink href="/kb">Knowledge Base</FooterLink> */}
                        </ul>

                        <button className="rounded-none bg-white/5 cursor-pointer hover:bg-white/20 transition-colors text-white text-xs font-semibold px-4 py-2 flex items-center gap-2">
                            Request New Feature
                        </button>
                    </div>

                    {/* Column 5: About Reglook */}
                    <div>
                        <h3 className="font-bold text-white mb-4">Company</h3>
                        <ul className="space-y-2.5">
                            {/* <FooterLink href="/company/about">About Us</FooterLink> */}
                            <FooterLink href="/company/partner-program">Partner Program</FooterLink>
                            <FooterLink href="/company/affiliate-program">Affiliate Program</FooterLink>
                            {/* <FooterLink href="/company/press-release">Press Release</FooterLink> */}
                            {/* <FooterLink href="/company/blog">Blog</FooterLink> */}
                            <FooterLink href="/company/terms">Terms & Conditions</FooterLink>
                            <FooterLink href="/company/privacy-policy">Privacy Policy</FooterLink>
                            <FooterLink href="/company/refund-policy">Refund Policy</FooterLink>
                            <FooterLink href="/company/domain-registration-data">Domain Registration Data</FooterLink>
                            <FooterLink href="/company/disclosure-policy">Disclosure Policy</FooterLink>
                            <FooterLink href="/company/cookies-preferences">Cookies Preferences</FooterLink>
                        </ul>
                    </div>

                    {/* Column 6: Follow Us */}
                    <div>
                        <h3 className="font-bold text-white mb-4">Follow Us</h3>
                        <div className="flex gap-3 mb-8">
                            <SocialIcon icon={Facebook} />
                            <SocialIcon icon={Twitter} />
                            <SocialIcon icon={Instagram} />
                            <SocialIcon icon={Linkedin} />
                        </div>

                        {/* Hover Partner Badge */}
                        <div className="inline-flex flex-col items-start gap-1.5 cursor-pointer">


                            <div className="flex flex-col items-start leading-tight">
                                <span className="text-[10px] font-medium tracking-wide text-white/60">
                                    Domain services, via
                                </span>
                                <img
                                    src="/partner/hover.svg"
                                    alt="Hover Partner"
                                    className="h-4 mt-2 w-auto object-contain"
                                    loading="lazy"
                                />
                            </div>
                        </div>

                    </div>
                </div>

                {/* Payment & Certification Section */}
                <div className="mt-16 pt-8 border-t border-white/5 grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Payment Options */}
                    <div>
                        <h3 className="font-bold text-white mb-4">Payment Options</h3>
                        <div className="flex flex-wrap gap-2 mb-3">
                            <PaymentIcon src="/pay/visa.svg" alt="Visa" />
                            <PaymentIcon src="/pay/mastercard.svg" alt="Mastercard" />
                            <PaymentIcon src="/pay/american-express.svg" alt="American Express" />
                            <PaymentIcon src="/pay/paypal.svg" alt="PayPal" />
                            <PaymentIcon src="/pay/apple-pay.svg" alt="Apple Pay" />
                            <PaymentIcon src="/pay/google-pay.svg" alt="Google Pay" />
                            {/* <PaymentIcon src="/pay/stripe.svg" alt="Stripe" /> */}
                        </div>
                        <p className="text-white/40 text-xs mt-3">We protect and save your data.</p>
                    </div>
                    {/* Trusted Infrastructure */}
                    <section className="space-y-4">
                        <h3 className="text-sm font-bold tracking-tight text-white">
                            Trusted Registrar Infrastructure
                        </h3>

                        <div className="flex flex-col gap-4 max-w-xl">
                            <div className="flex items-center gap-3 opacity-90">
                                {/* Hover Logo */}
                                <img
                                    src="/partner/hover.svg"
                                    alt="Hover"
                                    className="h-4 w-auto object-contain"
                                    loading="lazy"
                                />
                                <span className="text-white/30 text-sm font-light">x</span>
                                {/* Reglook Logo */}
                                <img
                                    src="/logo/reglook-logo.svg"
                                    alt="Reglook"
                                    className="h-7 w-auto object-contain"
                                    loading="lazy"
                                />
                            </div>

                            <p className="text-xs leading-relaxed text-white/70">
                                Domain services are provided through Hover, an <span className="font-bold text-white">ICANN-accredited registrar </span>
                                operated by <span className="font-bold text-white">Tucows</span>. All other hosting and platform services are built and
                                managed by <span className="font-bold text-white">Reglook</span>.
                            </p>
                        </div>
                    </section>

                </div>

                <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="flex gap-4">
  <div className="max-w-xl text-xs leading-relaxed text-white/60">
    <p>
      © 2026 Reglook. All rights reserved. Operated by{" "}
      <span className="font-medium text-white">
        <a
          href="https://www.intellaris.org"
          target="_blank"
          rel="noopener noreferrer"
          className="underline-offset-2 hover:underline"
        >
          Intellaris Private Limited
        </a>
      </span>.
    </p>

    <p className="mt-1 text-[11px] uppercase tracking-wide text-white/40">
      Intl HQ, Wing 1, Block 1, Salbari, Baksa District, Assam 781320, India
    </p>
  </div>
</div>



                </div>
            </div>
        </footer>
    )
}





function PaymentIcon({ src, alt }: { src: string, alt: string }) {
    return (
        <div className="flex items-center justify-center hover:opacity-80 transition-opacity cursor-default">
            <img src={src} alt={alt} className="h-7 w-auto object-contain" loading="lazy" />
        </div>
    )
}


function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <li>
            <Link href={href} className="text-white/60 hover:text-white transition-colors text-[13px] font-medium block">
                {children}
            </Link>
        </li>
    )
}

function SocialIcon({ icon: Icon }: { icon: any }) {
    return (
        <a href="#" className="h-9 w-9 rounded-none bg-white/5 flex items-center justify-center text-white/70 hover:bg-white/20 hover:text-white transition-all">
            <Icon className="w-4 h-4 text-white" />
        </a>
    )
}
