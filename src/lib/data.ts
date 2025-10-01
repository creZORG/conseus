import { PlaceHolderImages } from "./placeholder-images";
import { ShieldCheck, Gem, Handshake, Mail, Phone, MapPin, Ship, Wheat, HardHat, CircuitBoard, FlaskConical, Zap, PenTool } from "lucide-react";

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/products", label: "Products" },
  { href: "/certifications", label: "Certifications" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export const companyInfo = {
    name: "Conquistar Enterprises Limited",
    slogan: "Reliability in Every Shipment",
    phone: "+254 725 864 171",
    email: "conquistar91@gmail.com",
    altEmail: "supply@conquistar.co.ke",
    address: "Kahawa Wendani, Nina House",
    poBox: "P.O BOX 725864171 – 00100",
    whatsapp: "254725864171"
}

export const aboutFeatures = [
    {
      icon: ShieldCheck,
      title: "Reliability",
      description: "We pride ourselves on the dependability of our services, ensuring your shipments arrive on time, every time.",
    },
    {
      icon: Gem,
      title: "Quality",
      description: "Our commitment to quality is unwavering, from the products we source to the customer service we provide.",
    },
    {
      icon: Handshake,
      title: "Trust",
      description: "We build lasting relationships based on trust, transparency, and mutual respect with all our clients and partners.",
    },
];

const getImage = (id: string) => PlaceHolderImages.find(img => img.id === id);

export const heroSlides = [
    {
        id: "slide1",
        image: getImage("hero-shipments"),
        tagline: "Global Shipments, Handled with Care",
    },
    {
        id: "slide2",
        image: getImage("hero-food"),
        tagline: "Sourcing the Finest Food Supplies",
    },
    {
        id: "slide3",
        image: getImage("hero-construction"),
        tagline: "Building the Future with Quality Materials",
    },
    {
        id: "slide4",
        image: getImage("hero-electronics"),
        tagline: "The Latest in Electronic Innovations",
    }
];

export const products = [
    {
        name: "Foodstuffs",
        description: "A wide variety of general food supplies, sourced for quality and freshness.",
        image: getImage("product-foodstuffs"),
        icon: Ship
    },
    {
        name: "Cereals",
        description: "Premium quality cereals and grains, including maize, wheat, and rice.",
        image: getImage("product-cereals"),
        icon: Wheat
    },
    {
        name: "Construction Materials",
        description: "Durable and reliable materials for all your construction needs, from cement to steel.",
        image: getImage("product-construction"),
        icon: HardHat
    },
    {
        name: "Electronics",
        description: "The latest in consumer and industrial electronics, from trusted manufacturers.",
        image: getImage("product-electronics"),
        icon: CircuitBoard
    },
    {
        name: "Educational Lab Equipment",
        description: "State-of-the-art equipment for scientific and educational laboratories.",
        image: getImage("product-lab"),
        icon: FlaskConical
    },
    {
        name: "Electrical Products",
        description: "A comprehensive range of electrical products for residential and commercial use.",
        image: getImage("product-electrical"),
        icon: Zap
    },
    {
        name: "Stationery",
        description: "Complete office and school stationery supplies to keep you organized and productive.",
        image: getImage("product-stationery"),
        icon: PenTool
    }
];

export const whyChooseUsPoints = [
    "We Listen: Your needs are at the forefront of our operations. We take the time to understand your specific requirements.",
    "We Customize: We offer tailored solutions to meet the unique demands of your business, ensuring perfect fit and function.",
    "We Deliver: With a focus on efficiency and reliability, we guarantee timely delivery of all orders, every single time."
];


export const testimonials = [
    {
        quote: "Conquistar Enterprises has been a game-changer for our construction projects. Their material quality and delivery times are unmatched.",
        author: "John D., Project Manager",
        company: "BuildRight Corp"
    },
    {
        quote: "The reliability of their food supply chain has significantly boosted our restaurant's efficiency. We can always count on fresh, quality products.",
        author: "Maria S., Head Chef",
        company: "Gourmet Kitchen"
    },
    {
        quote: "As an electronics retailer, having a trustworthy supplier is crucial. Conquistar provides the latest products with excellent service.",
        author: "Alex P., CEO",
        company: "TechHub"
    },
    {
        quote: "Their educational lab equipment is top-notch. Our students are now learning with the best tools available, thanks to Conquistar.",
        author: "Dr. Emily R.",
        company: "Innovate University"
    }
];

export const timelineEvents = [
    {
        date: "July 2024",
        title: "Company Registration",
        description: "Conquistar Enterprises Limited was officially registered, marking the beginning of our journey to redefine supply chain reliability."
    },
    {
        date: "August 2024",
        title: "First Major Contract",
        description: "Secured our first major contract to supply construction materials for a large-scale housing project."
    },
    {
        date: "October 2024",
        title: "Expansion into Foodstuffs",
        description: "Expanded our portfolio to include the supply of high-quality foodstuffs and cereals to the hospitality industry."
    },
    {
        date: "Present",
        title: "Growing Strong",
        description: "Continuing to grow our client base and expand our product offerings, staying true to our core values of reliability, quality, and trust."
    }
];

export const missionVisionValues = {
    mission: "To be the most reliable partner for our clients by providing high-quality products and exceptional services, ensuring their success and satisfaction.",
    vision: "To become a leading supply company in the region, recognized for our diverse portfolio, operational excellence, and unwavering commitment to our clients.",
    values: ["Reliability", "Quality", "Trust", "Integrity", "Customer-Centricity"]
}

export const certifications = [
    {
        name: "Company Registration Certificate",
        image: getImage("certification-1"),
        description: "Official certificate of incorporation for Conquistar Enterprises Limited."
    },
    {
        name: "Quality Assurance Seal",
        image: getImage("certification-2"),
        description: "Certified for meeting high standards of quality in all our products and services."
    }
];


export const contactMethods = [
    { icon: Phone, label: "Phone", value: companyInfo.phone, href: `tel:${companyInfo.phone}` },
    { icon: Mail, label: "Email", value: companyInfo.email, href: `mailto:${companyInfo.email}` },
    { icon: MapPin, label: "Address", value: `${companyInfo.address}, ${companyInfo.poBox}` }
];

export const blogPosts = [
    {
        id: 1,
        title: "Navigating Global Logistics: Our Commitment to On-Time Delivery",
        date: "November 5, 2024",
        excerpt: "In today's fast-paced world, efficient logistics are more important than ever. Discover how Conquistar ensures your shipments arrive on time, every time.",
        image: getImage("blog-1")
    },
    {
        id: 2,
        title: "The Importance of Quality Sourcing in the Food Industry",
        date: "October 22, 2024",
        excerpt: "Quality starts at the source. We explore our rigorous process for selecting and vetting suppliers to bring only the best to your table.",
        image: getImage("blog-2")
    },
    {
        id: 3,
        title: "Conquistar Signs New Partnership to Expand Electronics Division",
        date: "October 1, 2024",
        excerpt: "We're excited to announce a new strategic partnership that will enhance our electronics offerings and bring more value to our customers.",
        image: getImage("blog-3")
    }
];
