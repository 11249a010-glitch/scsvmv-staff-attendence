import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Trash2, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";

interface AttendanceRecord {
  id: string;
  employee_code: string;
  employee_name: string;
  company: string;
  department: string;
  last_punch: string | null;
  punch_records: string | null;
  status: string;
  attendance_date: string;
}

interface AttendanceTableProps {
  departmentFilter?: string;
  statusFilter?: string;
  searchQuery?: string;
}

export const AttendanceTable = ({ departmentFilter, statusFilter, searchQuery }: AttendanceTableProps) => {
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecords();
  }, [departmentFilter, statusFilter]);

  const fetchRecords = async () => {
    setLoading(true);
    let query = supabase.from("staff_attendance").select("*").order("employee_code", { ascending: true });
    
    if (departmentFilter && departmentFilter !== "all") {
      query = query.eq("department", departmentFilter);
    }
    if (statusFilter && statusFilter !== "all") {
      query = query.eq("status", statusFilter);
    }

    const { data, error } = await query;
    if (!error && data) setRecords(data);
    setLoading(false);
  };

  const filteredRecords = searchQuery
    ? records.filter(r => 
        r.employee_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.employee_code.includes(searchQuery) ||
        r.department.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : records;

  const getStatusColor = (status: string) => {
    return status === "Present"
      ? "bg-[hsl(var(--success))]/10 text-[hsl(var(--success))]"
      : "bg-destructive/10 text-destructive";
  };

  const getInTime = (punchRecords: string | null) => {
    if (!punchRecords) return "—";
    const punches = punchRecords.split(",").filter(Boolean);
    return punches[0] || "—";
  };

  const getOutTime = (punchRecords: string | null) => {
    if (!punchRecords) return "—";
    const punches = punchRecords.split(",").filter(Boolean);
    return punches.length > 1 ? punches[punches.length - 1] : "—";
  };

  if (loading) {
    return (
      <Card className="card-shadow">
        <CardContent className="flex items-center justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-[hsl(var(--accent-teal))]" />
          <span className="ml-3 text-muted-foreground">Loading attendance data...</span>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="card-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Today's Attendance Records</CardTitle>
          <span className="text-sm text-muted-foreground">{filteredRecords.length} records</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-secondary/50">
                <TableHead className="text-xs font-semibold">Code</TableHead>
                <TableHead className="text-xs font-semibold">Staff Name</TableHead>
                <TableHead className="text-xs font-semibold">Company</TableHead>
                <TableHead className="text-xs font-semibold">Department</TableHead>
                <TableHead className="text-xs font-semibold">In-Time</TableHead>
                <TableHead className="text-xs font-semibold">Out-Time</TableHead>
                <TableHead className="text-xs font-semibold">Punch Records</TableHead>
                <TableHead className="text-xs font-semibold">Status</TableHead>
                <TableHead className="text-xs font-semibold text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.map((record) => (
                <TableRow key={record.id} className="hover:bg-secondary/30 text-sm">
                  <TableCell className="font-mono text-xs">{record.employee_code}</TableCell>
                  <TableCell className="font-medium">{record.employee_name}</TableCell>
                  <TableCell className="text-xs">{record.company}</TableCell>
                  <TableCell>{record.department}</TableCell>
                  <TableCell>{getInTime(record.punch_records)}</TableCell>
                  <TableCell>{getOutTime(record.punch_records)}</TableCell>
                  <TableCell className="text-xs text-muted-foreground max-w-[150px] truncate">
                    {record.punch_records || "—"}
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(record.status)}>
                      {record.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <Edit className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive">
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
