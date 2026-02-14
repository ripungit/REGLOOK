"use client";

import React from "react";
import {
    ArrowLeft,
    HelpCircle,
    Plus,
    Search,
    MapPin,
    MoreVertical,
    Building2,
    Phone,
    Mail,
    Globe,
    Check,
    Trash2,
    Edit2,
    Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AddressBookPage() {
    const [searchQuery, setSearchQuery] = React.useState("");
    const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);

    // Mock Address Data
    const [addresses, setAddresses] = React.useState([
        {
            id: "1",
            label: "HQ - Bangalore",
            isDefault: true,
            recipient: "Ripun Basumatary",
            company: "Reglook Inc.",
            addressLine1: "123 Tech Park, Innovation Street",
            addressLine2: "Suite 404, Block B",
            city: "Bangalore",
            state: "Karnataka",
            zip: "560100",
            country: "India",
            phone: "+91 98765 43210",
            email: "theripunbty@reglook.com"
        },
        {
            id: "2",
            label: "US Office",
            isDefault: false,
            recipient: "Finance Dept.",
            company: "Reglook LLC",
            addressLine1: "456 Market St",
            addressLine2: "Floor 12",
            city: "San Francisco",
            state: "California",
            zip: "94105",
            country: "United States",
            phone: "+1 (555) 123-4567",
            email: "finance@reglook.com"
        },
        {
            id: "3",
            label: "Home Address",
            isDefault: false,
            recipient: "Ripun Basumatary",
            company: "",
            addressLine1: "789 Quiet Lane",
            addressLine2: "",
            city: "Guwahati",
            state: "Assam",
            zip: "781001",
            country: "India",
            phone: "+91 98765 00000",
            email: "personal@example.com"
        }
    ]);

    const [newAddress, setNewAddress] = React.useState({
        label: "",
        recipient: "",
        company: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        zip: "",
        country: "",
        phone: "",
        email: "",
        isDefault: false
    });

    const ThemeColor = "#4338ca"; // Indigo-700

    const toggleDefault = (id: string) => {
        setAddresses(addresses.map(addr => ({
            ...addr,
            isDefault: addr.id === id
        })));
    };

    const deleteAddress = (id: string) => {
        setAddresses(addresses.filter(addr => addr.id !== id));
    };

    const handleAddAddress = () => {
        const id = (addresses.length + 1).toString();
        const addressToAdd = { ...newAddress, id };

        if (newAddress.isDefault) {
            setAddresses([
                ...addresses.map(addr => ({ ...addr, isDefault: false })),
                addressToAdd
            ]);
        } else {
            setAddresses([...addresses, addressToAdd]);
        }

        setIsAddModalOpen(false);
        setNewAddress({
            label: "",
            recipient: "",
            company: "",
            addressLine1: "",
            addressLine2: "",
            city: "",
            state: "",
            zip: "",
            country: "",
            phone: "",
            email: "",
            isDefault: false
        });
    };

    const filteredAddresses = addresses.filter(addr =>
        addr.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        addr.recipient.toLowerCase().includes(searchQuery.toLowerCase()) ||
        addr.city.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="w-full flex flex-col items-center relative bg-[#0f0f10] min-h-screen">

            {/* 1. Header Strip - Theme Indigo-700 */}
            <div className={`w-full bg-[${ThemeColor}] py-6 shadow-md z-10 transition-colors duration-300`}>
                <div className="w-full px-6 max-w-[1200px] lg:px-10 mx-auto">
                    <div className="flex items-center justify-between">
                        {/* Left: Back & Title */}
                        <div className="flex items-center gap-4">
                            <Link href="/foundation">
                                <Button className="text-white bg-white/10 hover:bg-white/20 hover:text-white cursor-pointer rounded-full h-10 w-10">
                                    <ArrowLeft size={22} />
                                </Button>
                            </Link>
                            <div className="h-6 w-px bg-white/20" />
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white/10 rounded-full backdrop-blur-sm">
                                    <Building2 className="text-white" size={22} />
                                </div>
                                <h1 className="text-2xl font-bold text-white tracking-tight">Address Book</h1>
                            </div>
                        </div>

                        {/* Right: Actions */}
                        <div className="flex items-center gap-3">
                            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                                <DialogTrigger asChild>
                                    <Button className="bg-white text-indigo-900 hover:bg-white/90 font-semibold rounded-full px-5 h-10 flex items-center gap-2 transition-all shadow-lg">
                                        <Plus size={18} />
                                        <span className="hidden sm:inline">Add New Address</span>
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="bg-[#000] border-zinc-800 text-white max-w-2xl">
                                    <DialogHeader>
                                        <DialogTitle className="text-xl font-bold flex items-center gap-2">
                                            <MapPin className="text-indigo-400" /> Add New Address
                                        </DialogTitle>
                                    </DialogHeader>
                                    <div className="grid grid-cols-2 gap-4 py-4">
                                        <div className="col-span-2 md:col-span-1 space-y-2">
                                            <Label className="text-zinc-400">Label (e.g., Home, Office)</Label>
                                            <Input
                                                value={newAddress.label}
                                                onChange={(e) => setNewAddress({ ...newAddress, label: e.target.value })}
                                                className="bg-[#0f0f10] border-zinc-800 focus:border-indigo-500 text-white"
                                                placeholder="My Office"
                                            />
                                        </div>
                                        <div className="col-span-2 md:col-span-1 space-y-2">
                                            <Label className="text-zinc-400">Recipient Name</Label>
                                            <Input
                                                value={newAddress.recipient}
                                                onChange={(e) => setNewAddress({ ...newAddress, recipient: e.target.value })}
                                                className="bg-[#0f0f10] border-zinc-800 focus:border-indigo-500 text-white"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                        <div className="col-span-2 space-y-2">
                                            <Label className="text-zinc-400">Company (Optional)</Label>
                                            <Input
                                                value={newAddress.company}
                                                onChange={(e) => setNewAddress({ ...newAddress, company: e.target.value })}
                                                className="bg-[#0f0f10] border-zinc-800 focus:border-indigo-500 text-white"
                                                placeholder="Acme Corp"
                                            />
                                        </div>
                                        <div className="col-span-2 space-y-2">
                                            <Label className="text-zinc-400">Address Line 1</Label>
                                            <Input
                                                value={newAddress.addressLine1}
                                                onChange={(e) => setNewAddress({ ...newAddress, addressLine1: e.target.value })}
                                                className="bg-[#0f0f10] border-zinc-800 focus:border-indigo-500 text-white"
                                                placeholder="123 Main St"
                                            />
                                        </div>
                                        <div className="col-span-2 space-y-2">
                                            <Label className="text-zinc-400">Address Line 2 (Optional)</Label>
                                            <Input
                                                value={newAddress.addressLine2}
                                                onChange={(e) => setNewAddress({ ...newAddress, addressLine2: e.target.value })}
                                                className="bg-[#0f0f10] border-zinc-800 focus:border-indigo-500 text-white"
                                                placeholder="Apt 4B"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-zinc-400">City</Label>
                                            <Input
                                                value={newAddress.city}
                                                onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                                                className="bg-[#0f0f10] border-zinc-800 focus:border-indigo-500 text-white"
                                                placeholder="New York"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-zinc-400">State / Province</Label>
                                            <Input
                                                value={newAddress.state}
                                                onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                                                className="bg-[#0f0f10] border-zinc-800 focus:border-indigo-500 text-white"
                                                placeholder="NY"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-zinc-400">Zip / Postal Code</Label>
                                            <Input
                                                value={newAddress.zip}
                                                onChange={(e) => setNewAddress({ ...newAddress, zip: e.target.value })}
                                                className="bg-[#0f0f10] border-zinc-800 focus:border-indigo-500 text-white"
                                                placeholder="10001"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-zinc-400">Country</Label>
                                            <Input
                                                value={newAddress.country}
                                                onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })}
                                                className="bg-[#0f0f10] border-zinc-800 focus:border-indigo-500 text-white"
                                                placeholder="United States"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-zinc-400">Phone Number</Label>
                                            <Input
                                                value={newAddress.phone}
                                                onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                                                className="bg-[#0f0f10] border-zinc-800 focus:border-indigo-500 text-white"
                                                placeholder="+1 234 567 8900"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-zinc-400">Email Address</Label>
                                            <Input
                                                value={newAddress.email}
                                                onChange={(e) => setNewAddress({ ...newAddress, email: e.target.value })}
                                                className="bg-[#0f0f10] border-zinc-800 focus:border-indigo-500 text-white"
                                                placeholder="email@example.com"
                                            />
                                        </div>
                                        <div className="col-span-2 flex items-center space-x-2 pt-2">
                                            <Checkbox
                                                id="default"
                                                checked={newAddress.isDefault}
                                                onCheckedChange={(checked) => setNewAddress({ ...newAddress, isDefault: checked as boolean })}
                                                className="data-[state=checked]:bg-indigo-600 border-zinc-600"
                                            />
                                            <Label htmlFor="default" className="text-white cursor-pointer select-none">Set as default address</Label>
                                        </div>
                                    </div>
                                    <div className="flex justify-end gap-3 pt-4 border-t border-zinc-800">
                                        <Button variant="ghost" onClick={() => setIsAddModalOpen(false)} className="text-zinc-400 hover:text-white hover:bg-white/10">Cancel</Button>
                                        <Button onClick={handleAddAddress} className="bg-indigo-600 hover:bg-indigo-500 text-white">Save Address</Button>
                                    </div>
                                </DialogContent>
                            </Dialog>
                            <Button className="text-white/80 bg-white/10 hover:text-white hover:bg-white/10 rounded-full h-10 w-10">
                                <HelpCircle size={22} />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Main Content Area */}
            <div className="w-full px-6 max-w-[1200px] lg:px-10 py-8 flex-1">

                {/* Search & Filter Bar */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                        <Input
                            placeholder="Search addresses..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-[#1c1c1f] border-zinc-800 text-white pl-10 h-11 focus:border-indigo-500 rounded-xl"
                        />
                    </div>
                    <div className="text-zinc-500 text-sm font-medium">
                        Showing {filteredAddresses.length} addresses
                    </div>
                </div>

                {/* Address Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredAddresses.map((addr) => (
                        <motion.div
                            layout
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            key={addr.id}
                            className={`group relative bg-transparent border ${addr.isDefault ? 'border-indigo-500/50 shadow-[0_0_20px_-10px_rgba(79,70,229,0.3)]' : 'border-zinc-800/50'} rounded-2xl p-6 hover:border-zinc-700/80 transition-all`}
                        >
                            {/* Card Header */}
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2.5 rounded-xl ${addr.isDefault ? 'bg-indigo-500/20 text-indigo-400' : 'bg-zinc-800 text-zinc-400'}`}>
                                        <MapPin size={20} />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-semibold text-base flex items-center gap-2">
                                            {addr.label}
                                            {addr.isDefault && (
                                                <Badge className="bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30 border-0 h-5 px-1.5 text-[10px] uppercase font-bold tracking-wide">
                                                    Default
                                                </Badge>
                                            )}
                                        </h3>
                                        <p className="text-zinc-500 text-xs mt-0.5">{addr.country}</p>
                                    </div>
                                </div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <button className="text-zinc-500 hover:text-white p-1 rounded-md hover:bg-white/5 transition-colors">
                                            <MoreVertical size={18} />
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="bg-[#1c1c1f] border-zinc-800 text-white w-48">
                                        <DropdownMenuItem onClick={() => { }} className="cursor-pointer">
                                            <Edit2 size={14} className="mr-2" /> Edit Details
                                        </DropdownMenuItem>
                                        {!addr.isDefault && (
                                            <DropdownMenuItem onClick={() => toggleDefault(addr.id)} className="cursor-pointer">
                                                <Star size={14} className="mr-2" /> Set as Default
                                            </DropdownMenuItem>
                                        )}
                                        <DropdownMenuItem onClick={() => deleteAddress(addr.id)} className="text-red-400 focus:text-red-300 cursor-pointer">
                                            <Trash2 size={14} className="mr-2" /> Delete Address
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>

                            {/* Card Body */}
                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <p className="text-white font-medium text-sm">{addr.recipient}</p>
                                    {addr.company && <p className="text-zinc-400 text-sm">{addr.company}</p>}
                                </div>

                                <div className="space-y-1 text-sm text-zinc-400">
                                    <p>{addr.addressLine1}</p>
                                    {addr.addressLine2 && <p>{addr.addressLine2}</p>}
                                    <p>{addr.city}, {addr.state} {addr.zip}</p>
                                </div>

                                <div className="pt-4 border-t border-zinc-800/50 space-y-2">
                                    <div className="flex items-center gap-3 text-xs text-zinc-500">
                                        <Phone size={14} />
                                        <span>{addr.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-xs text-zinc-500">
                                        <Mail size={14} />
                                        <span className="truncate">{addr.email}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {/* Add New Card (Empty State-ish) */}
                    <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                        <DialogTrigger asChild>
                            <button className="group border border-dashed border-zinc-800 hover:border-indigo-500/50 hover:bg-indigo-500/5 rounded-3xl p-6 flex flex-col items-center justify-center gap-4 transition-all min-h-[300px]">
                                <div className="p-4 rounded-full bg-zinc-900 group-hover:bg-indigo-500/10 text-zinc-600 group-hover:text-indigo-400 transition-colors">
                                    <Plus size={32} />
                                </div>
                                <div className="text-center space-y-1">
                                    <h3 className="text-white font-medium group-hover:text-indigo-300 transition-colors">Add New Address</h3>
                                    <p className="text-zinc-500 text-xs">Register a new billing or shipping location</p>
                                </div>
                            </button>
                        </DialogTrigger>
                        <DialogContent className="bg-[#000] border-zinc-800 text-white max-w-2xl">
                            <DialogHeader>
                                <DialogTitle className="text-xl font-bold flex items-center gap-2">
                                    <MapPin className="text-indigo-400" /> Add New Address
                                </DialogTitle>
                            </DialogHeader>
                            <div className="grid grid-cols-2 gap-4 py-4">
                                <div className="col-span-2 md:col-span-1 space-y-2">
                                    <Label className="text-zinc-400">Label (e.g., Home, Office)</Label>
                                    <Input
                                        value={newAddress.label}
                                        onChange={(e) => setNewAddress({ ...newAddress, label: e.target.value })}
                                        className="bg-[#000] border-zinc-800 focus:border-indigo-500 text-white"
                                        placeholder="My Office"
                                    />
                                </div>
                                <div className="col-span-2 md:col-span-1 space-y-2">
                                    <Label className="text-zinc-400">Recipient Name</Label>
                                    <Input
                                        value={newAddress.recipient}
                                        onChange={(e) => setNewAddress({ ...newAddress, recipient: e.target.value })}
                                        className="bg-[#000] border-zinc-800 focus:border-indigo-500 text-white"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="col-span-2 space-y-2">
                                    <Label className="text-zinc-400">Company (Optional)</Label>
                                    <Input
                                        value={newAddress.company}
                                        onChange={(e) => setNewAddress({ ...newAddress, company: e.target.value })}
                                        className="bg-[#000] border-zinc-800 focus:border-indigo-500 text-white"
                                        placeholder="Acme Corp"
                                    />
                                </div>
                                <div className="col-span-2 space-y-2">
                                    <Label className="text-zinc-400">Address Line 1</Label>
                                    <Input
                                        value={newAddress.addressLine1}
                                        onChange={(e) => setNewAddress({ ...newAddress, addressLine1: e.target.value })}
                                        className="bg-[#000] border-zinc-800 focus:border-indigo-500 text-white"
                                        placeholder="123 Main St"
                                    />
                                </div>
                                <div className="col-span-2 space-y-2">
                                    <Label className="text-zinc-400">Address Line 2 (Optional)</Label>
                                    <Input
                                        value={newAddress.addressLine2}
                                        onChange={(e) => setNewAddress({ ...newAddress, addressLine2: e.target.value })}
                                        className="bg-[#000] border-zinc-800 focus:border-indigo-500 text-white"
                                        placeholder="Apt 4B"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-zinc-400">City</Label>
                                    <Input
                                        value={newAddress.city}
                                        onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                                        className="bg-[#000] border-zinc-800 focus:border-indigo-500 text-white"
                                        placeholder="New York"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-zinc-400">State / Province</Label>
                                    <Input
                                        value={newAddress.state}
                                        onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                                        className="bg-[#000] border-zinc-800 focus:border-indigo-500 text-white"
                                        placeholder="NY"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-zinc-400">Zip / Postal Code</Label>
                                    <Input
                                        value={newAddress.zip}
                                        onChange={(e) => setNewAddress({ ...newAddress, zip: e.target.value })}
                                        className="bg-[#000] border-zinc-800 focus:border-indigo-500 text-white"
                                        placeholder="10001"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-zinc-400">Country</Label>
                                    <Input
                                        value={newAddress.country}
                                        onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })}
                                        className="bg-[#000] border-zinc-800 focus:border-indigo-500 text-white"
                                        placeholder="United States"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-zinc-400">Phone Number</Label>
                                    <Input
                                        value={newAddress.phone}
                                        onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                                        className="bg-[#000] border-zinc-800 focus:border-indigo-500 text-white"
                                        placeholder="+1 234 567 8900"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-zinc-400">Email Address</Label>
                                    <Input
                                        value={newAddress.email}
                                        onChange={(e) => setNewAddress({ ...newAddress, email: e.target.value })}
                                        className="bg-[#000] border-zinc-800 focus:border-indigo-500 text-white"
                                        placeholder="email@example.com"
                                    />
                                </div>
                                <div className="col-span-2 flex items-center space-x-2 pt-2">
                                    <Checkbox
                                        id="default"
                                        checked={newAddress.isDefault}
                                        onCheckedChange={(checked) => setNewAddress({ ...newAddress, isDefault: checked as boolean })}
                                        className="data-[state=checked]:bg-indigo-600 border-zinc-600"
                                    />
                                    <Label htmlFor="default" className="text-white cursor-pointer select-none">Set as default address</Label>
                                </div>
                            </div>
                            <div className="flex justify-end gap-3 pt-4 border-t border-zinc-800">
                                <Button variant="ghost" onClick={() => setIsAddModalOpen(false)} className="text-zinc-400 hover:text-white hover:bg-white/10">Cancel</Button>
                                <Button onClick={handleAddAddress} className="bg-indigo-600 hover:bg-indigo-500 text-white">Save Address</Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </div>
    );
}
