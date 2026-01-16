import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { Code2, Github, Twitter, Linkedin, Mail } from "lucide-react";
const footerLinks = {
    product: [
        { name: "Courses", path: "/courses" },
        { name: "Pricing", path: "/pricing" },
        { name: "Roadmaps", path: "/roadmaps" },
        { name: "Certificates", path: "/certificates" },
    ],
    company: [
        { name: "About", path: "/about" },
        { name: "Careers", path: "/careers" },
        { name: "Blog", path: "/blog" },
        { name: "Contact", path: "/contact" },
    ],
    resources: [
        { name: "Documentation", path: "/docs" },
        { name: "Community", path: "/community" },
        { name: "Support", path: "/support" },
        { name: "FAQ", path: "/faq" },
    ],
    legal: [
        { name: "Privacy", path: "/privacy" },
        { name: "Terms", path: "/terms" },
        { name: "Cookies", path: "/cookies" },
    ],
};
const socialLinks = [
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Mail, href: "#", label: "Email" },
];
export const Footer = () => {
    return (_jsxs("footer", { className: "relative border-t border-border/50 bg-card/30", children: [_jsx("div", { className: "absolute inset-0 bg-linear-to-t from-primary/5 to-transparent pointer-events-none" }), _jsxs("div", { className: "container mx-auto px-4 lg:px-8 py-16 relative", children: [_jsxs("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12", children: [_jsxs("div", { className: "col-span-2 md:col-span-3 lg:col-span-2", children: [_jsxs(Link, { to: "/", className: "flex items-center gap-2 mb-4", children: [_jsx("div", { className: "w-10 h-10 rounded-xl bg-linear-to-br from-primary to-neon-cyan flex items-center justify-center", children: _jsx(Code2, { className: "w-5 h-5 text-primary-foreground" }) }), _jsx("span", { className: "text-xl font-bold gradient-text", children: "Code Mitra" })] }), _jsx("p", { className: "text-muted-foreground text-sm leading-relaxed mb-6 max-w-sm", children: "Master programming with industry-ready courses. Join thousands of developers building their future with Code Mitra." }), _jsx("div", { className: "flex items-center gap-3", children: socialLinks.map((social) => (_jsx("a", { href: social.href, "aria-label": social.label, className: "w-10 h-10 rounded-lg glass-panel flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300", children: _jsx(social.icon, { className: "w-4 h-4" }) }, social.label))) })] }), _jsxs("div", { children: [_jsx("h4", { className: "font-semibold text-foreground mb-4", children: "Product" }), _jsx("ul", { className: "space-y-3", children: footerLinks.product.map((link) => (_jsx("li", { children: _jsx(Link, { to: link.path, className: "text-sm text-muted-foreground hover:text-primary transition-colors duration-200", children: link.name }) }, link.path))) })] }), _jsxs("div", { children: [_jsx("h4", { className: "font-semibold text-foreground mb-4", children: "Company" }), _jsx("ul", { className: "space-y-3", children: footerLinks.company.map((link) => (_jsx("li", { children: _jsx(Link, { to: link.path, className: "text-sm text-muted-foreground hover:text-primary transition-colors duration-200", children: link.name }) }, link.path))) })] }), _jsxs("div", { children: [_jsx("h4", { className: "font-semibold text-foreground mb-4", children: "Resources" }), _jsx("ul", { className: "space-y-3", children: footerLinks.resources.map((link) => (_jsx("li", { children: _jsx(Link, { to: link.path, className: "text-sm text-muted-foreground hover:text-primary transition-colors duration-200", children: link.name }) }, link.path))) })] }), _jsxs("div", { children: [_jsx("h4", { className: "font-semibold text-foreground mb-4", children: "Legal" }), _jsx("ul", { className: "space-y-3", children: footerLinks.legal.map((link) => (_jsx("li", { children: _jsx(Link, { to: link.path, className: "text-sm text-muted-foreground hover:text-primary transition-colors duration-200", children: link.name }) }, link.path))) })] })] }), _jsxs("div", { className: "mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4", children: [_jsxs("p", { className: "text-sm text-muted-foreground", children: ["\u00A9 ", new Date().getFullYear(), " Code Mitra. All rights reserved."] }), _jsxs("p", { className: "text-sm text-muted-foreground", children: ["Made with ", _jsx("span", { className: "text-primary", children: "\u2665" }), " for developers worldwide"] })] })] })] }));
};
