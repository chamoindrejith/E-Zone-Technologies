import { useState } from "react";
import { motion } from "framer-motion";
import { Smartphone, HardDrive, Monitor, Cpu, Zap, MessageCircle, Eye, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import flyer005 from "@/assets/flyers/005.jpg.jpeg";
import flyer011 from "@/assets/flyers/011.jpg.jpeg";
import flyer015 from "@/assets/flyers/015.jpg.jpeg";
import flyer021 from "@/assets/flyers/021.jpg.jpeg";
import flyer027 from "@/assets/flyers/027.jpg.jpeg";
import image005 from "@/assets/laptopImages/005.png";
import image011 from "@/assets/laptopImages/011.png";
import image015 from "@/assets/laptopImages/015.jpg";
import image021 from "@/assets/laptopImages/021.jpg";
import image027 from "@/assets/laptopImages/027.jpg";
import packageMouse from "@/assets/package/mouse.jpg";
import packageKeyboard from "@/assets/package/Keyboard.jpeg";
import packageHandsfree from "@/assets/package/handsfree.webp";
import packageRingLight from "@/assets/package/ring light.webp";
import packageCoolingPad from "@/assets/package/cooling pad.jpg";
import packageMousePad from "@/assets/package/ng mouse pad.jpg";
import packageOffice from "@/assets/package/Office.png";
import packageWindows from "@/assets/package/Windows.jpg";
import Navbar from "@/components/Navbar";

interface LaptopModel {
  code: string;
  brand: string;
  model: string;
  processor: string;
  gpu?: string;
  ram: string;
  storage: string;
  display: string;
  monthlyRental: string;
  downPayment: string;
  freeGifts: string[];
  warranty: string;
  serviceWarranty: string;
  includes: string;
  flyer?: string;
}

const laptopModels: LaptopModel[] = [
  {
    code: "005",
    brand: "ASUS",
    model: "ExpertBook B1 B1503CVA",
    processor: "Intel Core i7 14th Gen",
    ram: "8GB DDR4",
    storage: "512GB NVMe SSD",
    display: "15.6\" FHD Anti-Glare",
    monthlyRental: "7,302",
    downPayment: "125,000",
    freeGifts: ["Wireless Gaming Mouse", "Keyboard", "Handsfree", "Ring Light", "Cooling Pad", "Long Gaming Mouse Pad"],
    warranty: "1 Year Hardware",
    serviceWarranty: "2 Years Service",
    includes: "Genuine Windows & Office"
  },
  {
    code: "011",
    brand: "Lenovo",
    model: "LOQ 15IRX10 i7",
    processor: "Intel Core i7 13th Gen HX",
    gpu: "NVIDIA GeForce RTX 5060",
    ram: "16GB DDR5",
    storage: "512GB NVMe SSD",
    display: "15.6\" FHD 144Hz",
    monthlyRental: "12,651",
    downPayment: "179,000",
    freeGifts: ["Wireless Gaming Mouse", "Keyboard", "Handsfree", "Ring Light", "Cooling Pad", "Long Gaming Mouse Pad"],
    warranty: "1 Year Hardware",
    serviceWarranty: "2 Years Service",
    includes: "Genuine Windows 11 Home & Office",
  },
  {
    code: "015",
    brand: "Dell",
    model: "Dell 15 DC15250",
    processor: "Intel Core 5 14th Gen",
    ram: "8GB DDR4",
    storage: "512GB NVMe SSD",
    display: "15.6\" FHD Anti-Glare",
    monthlyRental: "6,198",
    downPayment: "99,000",
    freeGifts: ["Wireless Gaming Mouse", "Keyboard", "Handsfree", "Ring Light", "Cooling Pad", "Long Gaming Mouse Pad"],
    warranty: "1 Year Hardware",
    serviceWarranty: "2 Years Service",
    includes: "Genuine Windows 11 Home & Office"
  },
  {
    code: "021",
    brand: "HP",
    model: "HP 250",
    processor: "Intel Core i5 13th Gen",
    ram: "8GB DDR4",
    storage: "512GB NVMe SSD",
    display: "15.6\" FHD Anti-Glare",
    monthlyRental: "6,495",
    downPayment: "99,000",
    freeGifts: ["Wireless Gaming Mouse", "Keyboard", "Handsfree", "Ring Light", "Cooling Pad", "Long Gaming Mouse Pad"],
    warranty: "1 Year Hardware",
    serviceWarranty: "2 Years Service",
    includes: "Genuine Windows 11 Home & Office"
  },
  {
    code: "027",
    brand: "Lenovo",
    model: "V15 G5",
    processor: "Core i5 13420H (H Processor)",
    ram: "DDR5 8GB",
    storage: "512GB NVMe SSD",
    display: "15.6\" FHD",
    monthlyRental: "7,556",
    downPayment: "89,000",
    freeGifts: ["Wireless Gaming Mouse", "Keyboard", "Handsfree", "Ring Light", "Cooling Pad", "Long Gaming Mouse Pad"],
    warranty: "1 Year Hardware",
    serviceWarranty: "2 Years Service",
    includes: "Genuine Windows & Office",
  },
];

const flyerMap: Record<string, string> = {
  "005": flyer005,
  "011": flyer011,
  "015": flyer015,
  "021": flyer021,
  "027": flyer027,
};

const laptopImageMap: Record<string, string> = {
  "005": image005,
  "011": image011,
  "015": image015,
  "021": image021,
  "027": image027,
};

const InstallmentPlans = () => {
  const [selectedFlyer, setSelectedFlyer] = useState<string | null>(null);

  const packageItems = [
    { name: "Wireless Gaming Mouse", image: packageMouse },
    { name: "Keyboard", image: packageKeyboard },
    { name: "Handsfree", image: packageHandsfree },
    { name: "Ring Light", image: packageRingLight },
    { name: "Cooling Pad", image: packageCoolingPad },
    { name: "Gaming Mouse Pad", image: packageMousePad },
  ];

  const generateWhatsAppLink = (laptop: LaptopModel) => {
    const message = `Hi! I'm interested in the ${laptop.brand} ${laptop.model} (CODE ${laptop.code}).

SPECIFICATIONS:
• Processor: ${laptop.processor}
${laptop.gpu ? `• GPU: ${laptop.gpu}\n` : ""}• RAM: ${laptop.ram}
• Storage: ${laptop.storage}
• Display: ${laptop.display}

PRICING:
• Monthly Rental: Rs. ${laptop.monthlyRental}/-
• Down Payment: Rs. ${laptop.downPayment}/-

WARRANTY & INCLUDES:
• ${laptop.warranty} Warranty
• ${laptop.serviceWarranty} Warranty
• ${laptop.includes}

Could you please provide more details? Thank you!`;

    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/94717811111?text=${encodedMessage}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <div className="relative overflow-hidden pt-24 pb-16 md:pt-28 md:pb-24">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-primary/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[120px]" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-4">
              <span className="text-gradient">Laptop Installment Plans</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose from our premium collection of laptops with flexible installment options. Get the latest technology with affordable monthly payments.
            </p>

            <div className="mt-6">
              <Button asChild variant="outline" className="gap-2">
                <Link to="/">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Home
                </Link>
              </Button>
            </div>
          </motion.div>
          </div>
        </div>


      <div className="relative overflow-hidden py-12 md:py-16 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5 border-y border-primary/10">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-[80px]" />
          <div className="absolute bottom-1/2 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[100px]" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Genuine Windows + Office Badge */}
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
              <div className="flex items-center ">
                <img
                  src={packageWindows}
                  alt="Windows"
                  className="w-10 h-10 object-cover"
                /> +
                <img
                  src={packageOffice}
                  alt="Microsoft Office"
                  className="w-10 h-10 object-cover "
                />
              </div>
              <span className="text-emerald-400 font-semibold tracking-wide uppercase text-sm">
                Free Genuine Windows + Microsoft Office
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              <span className="text-foreground">Plus Choose Your </span>
              <span className="text-gradient">FREE Gift</span>
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Select any one premium gift from our collection - included absolutely free with every laptop purchase!
            </p>

            {/* Gift Items Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
              {packageItems.map((item, index) => {
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    whileHover={{ scale: 1.05, y: -4 }}
                    className="group relative p-4 rounded-xl bg-card/60 backdrop-blur-sm border border-border/60 hover:border-primary/50 hover:shadow-glow-sm transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-background/80 border border-border/50 group-hover:scale-110 transition-transform duration-300">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-sm font-medium text-center group-hover:text-primary transition-colors">
                        {item.name}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Laptops Grid */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {laptopModels.map((laptop, index) => (
            <motion.div
              key={laptop.code}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="group relative h-full rounded-xl border border-glow bg-card/50 backdrop-blur-sm overflow-hidden hover:shadow-glow transition-all duration-300 hover:border-primary/50 hover:-translate-y-1">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-br from-primary to-accent transition-opacity duration-300" />

                <div className="relative p-6">
                  {/* Product Image */}
                  <div className="mb-5 overflow-hidden rounded-xl border border-border/50 bg-white shadow-sm">
                    <img
                      src={laptopImageMap[laptop.code]}
                      alt={`${laptop.brand} ${laptop.model}`}
                      className="h-44 w-full object-contain p-3"
                    />
                  </div>

                  {/* Brand & Model */}
                  <div className="mb-4">
                    <div className="inline-block px-3 py-1 rounded-full bg-primary/20 border border-primary/40 mb-3">
                      <span className="text-xs font-mono font-bold text-primary">CODE {laptop.code}</span>
                    </div>
                    <h2 className="text-2xl font-bold mb-1">{laptop.brand}</h2>
                    <p className="text-sm text-muted-foreground">{laptop.model}</p>
                  </div>

                  {/* Free Gift Section */}
                  <div className="mb-6 pb-6 border-b border-border/50">
                    <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">FREE GIFT - Choose 1</p>
                    <div className="flex flex-wrap gap-2">
                      {laptop.freeGifts.map((gift, i) => (
                        <span
                          key={i}
                          className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-300"
                        >
                          {gift}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Specs */}
                  <div className="space-y-2 mb-6 pb-6 border-b border-border/50">
                    <div className="flex items-start gap-3">
                      <Cpu className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-muted-foreground">Processor</p>
                        <p className="text-sm font-medium">{laptop.processor}</p>
                      </div>
                    </div>

                    {laptop.gpu && (
                      <div className="flex items-start gap-3">
                        <Zap className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-muted-foreground">GPU</p>
                          <p className="text-sm font-medium">{laptop.gpu}</p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-start gap-3">
                      <Smartphone className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-muted-foreground">Memory</p>
                        <p className="text-sm font-medium">{laptop.ram}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <HardDrive className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-muted-foreground">Storage</p>
                        <p className="text-sm font-medium">{laptop.storage}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Monitor className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-muted-foreground">Display</p>
                        <p className="text-sm font-medium">{laptop.display}</p>
                      </div>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="bg-gradient-brand/10 rounded-lg p-4 mb-6 border border-primary/20">
                    <div className="mb-3">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">Monthly Rental</p>
                      <p className="text-3xl font-bold text-primary">
                        Rs. <span className="text-yellow-400">{laptop.monthlyRental}</span>/-
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">Down Payment</p>
                      <p className="text-lg font-semibold">Rs. {laptop.downPayment}/-</p>
                    </div>
                  </div>

                  {/* Warranty & Includes */}
                  <div className="space-y-2 mb-6 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span>{laptop.warranty} Warranty</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                      <span>{laptop.serviceWarranty} Warranty</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span className="text-emerald-400">{laptop.includes}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 gap-2"
                        >
                          <Eye className="w-4 h-4" />
                          More Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl">
                        <DialogHeader>
                          <DialogTitle>
                            {laptop.brand} {laptop.model} - CODE {laptop.code}
                          </DialogTitle>
                        </DialogHeader>
                        <div className="relative w-full bg-background rounded-lg overflow-auto max-h-[70vh]">
                          <img
                            src={flyerMap[laptop.code]}
                            alt={`${laptop.brand} ${laptop.model} Flyer`}
                            className="w-full h-auto object-contain"
                          />
                        </div>
                      </DialogContent>
                    </Dialog>

                    <a
                      href={generateWhatsAppLink(laptop)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 h-9 px-3 rounded-md font-semibold text-white bg-green-600 hover:bg-green-700 transition-colors text-sm"
                    >
                      <MessageCircle className="w-4 h-4" />
                      WhatsApp
                    </a>
                  </div>

                  
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="container mx-auto px-6 py-16 text-center"
      >
        <div className="inline-block rounded-lg border border-glow bg-card/50 backdrop-blur-sm p-8">
          <h2 className="text-2xl font-bold mb-4">Ready to Get Your Laptop?</h2>
          <p className="text-muted-foreground mb-6">
            Choose your preferred model and contact us today. We're here to help!
          </p>
          <Button asChild size="lg" className="bg-gradient-brand hover:opacity-90">
            <Link to="/#contact">
              Get in Touch
            </Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default InstallmentPlans;
