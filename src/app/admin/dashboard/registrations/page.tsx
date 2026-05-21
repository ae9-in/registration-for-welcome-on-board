"use client";

import { useEffect, useState, useCallback } from "react";
import { Search, Download, ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Registration {
  _id: string;
  registrationId: string;
  studentName: string;
  schoolName: string;
  parentContact?: string;
  gender: string;
  selectedEvents: string[];
  totalAmount: number;
  pricingType: string;
  createdAt: string;
}

export default function RegistrationsPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchRegistrations = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/registrations?page=${page}&limit=10&search=${search}`);
      const result = await res.json();
      if (result.success) {
        setRegistrations(result.data);
        setTotalPages(result.pagination.totalPages || 1);
      }
    } catch (err) {
      console.error("Failed to fetch registrations", err);
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this registration?")) {
      return;
    }

    // Optimistically remove from UI
    const originalRegistrations = [...registrations];
    setRegistrations(registrations.filter((r) => r._id !== id));

    try {
      const res = await fetch(`/api/admin/registrations?id=${id}`, {
        method: "DELETE",
      });
      const result = await res.json();
      if (!result.success) {
        alert(result.error || "Failed to delete registration");
        setRegistrations(originalRegistrations); // Rollback
      }
    } catch (err) {
      console.error("Error deleting registration", err);
      alert("Failed to delete registration");
      setRegistrations(originalRegistrations); // Rollback
    }
  };


  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchRegistrations();
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [fetchRegistrations]);

  const handleExportCSV = () => {
    const headers = ["Registration ID,Student Name,School,Gender,Contact,Events,Amount,Type,Date"];
    const csvContent = registrations.map((r) => {
      return `${r.registrationId},"${r.studentName}","${r.schoolName}","${r.gender}",${r.parentContact || ""},"${r.selectedEvents.join(" | ")}",${r.totalAmount},${r.pricingType},${new Date(r.createdAt).toLocaleDateString()}`;
    });
    
    const csv = [...headers, ...csvContent].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `registrations_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-space-grotesk font-bold text-white">Registrations</h1>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <Input
              type="text"
              placeholder="Search by name, ID or school..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1); // Reset page on new search
              }}
              className="pl-9 bg-white/5 border-white/10 text-white focus:border-[#00D4FF]"
            />
          </div>
          
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-md transition-colors border border-white/10 whitespace-nowrap"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      <div className="glass-card border-white/10 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-white/5">
              <TableRow className="border-white/10 hover:bg-transparent">
                <TableHead className="text-white/60">ID</TableHead>
                <TableHead className="text-white/60">Student Name</TableHead>
                <TableHead className="text-white/60">School</TableHead>
                <TableHead className="text-white/60">Events</TableHead>
                <TableHead className="text-white/60">Amount</TableHead>
                <TableHead className="text-white/60">Date</TableHead>
                <TableHead className="text-white/60 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-32 text-center text-white/40">
                    Loading data...
                  </TableCell>
                </TableRow>
              ) : registrations.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-32 text-center text-white/40">
                    No registrations found.
                  </TableCell>
                </TableRow>
              ) : (
                registrations.map((reg) => (
                  <TableRow key={reg._id} className="border-white/10 hover:bg-white/5">
                    <TableCell className="font-mono text-white/80">{reg.registrationId}</TableCell>
                    <TableCell className="font-medium text-white">{reg.studentName}</TableCell>
                    <TableCell className="text-white/70">{reg.schoolName}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {reg.selectedEvents.map((event) => (
                          <Badge key={event} variant="secondary" className="bg-[#1E6FFF]/20 text-[#00D4FF] hover:bg-[#1E6FFF]/30 text-xs border-[#1E6FFF]/30">
                            {event}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-bold text-emerald-400">₹{reg.totalAmount}</span>
                      <span className="text-xs text-white/40 ml-2 capitalize">({reg.pricingType})</span>
                    </TableCell>
                    <TableCell className="text-white/60 text-sm">
                      {new Date(reg.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <button
                        onClick={() => handleDelete(reg._id)}
                        className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors border border-red-500/20"
                        title="Delete Registration"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        
        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-white/10 bg-white/5">
            <span className="text-sm text-white/60">
              Page {page} of {totalPages}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2 rounded-md bg-white/10 hover:bg-white/20 disabled:opacity-50 text-white transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-2 rounded-md bg-white/10 hover:bg-white/20 disabled:opacity-50 text-white transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
