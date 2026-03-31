import { Calendar, Filter, Download, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";

interface DashboardFiltersProps {
  departmentFilter: string;
  setDepartmentFilter: (v: string) => void;
  statusFilter: string;
  setStatusFilter: (v: string) => void;
  searchQuery: string;
  setSearchQuery: (v: string) => void;
}

const departments = [
  "all", "CSE", "CSA", "ECE", "EEE", "E&I", "Mech", "Vehicle", 
  "Finance", "Library", "Purchase", "COE", "Dean E&T", "Dean Science", "Maths"
];

export const DashboardFilters = ({
  departmentFilter, setDepartmentFilter,
  statusFilter, setStatusFilter,
  searchQuery, setSearchQuery,
}: DashboardFiltersProps) => {
  return (
    <Card className="p-3 card-shadow">
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by name, code, department..."
            className="pl-9 text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
          <SelectTrigger className="w-[160px] text-sm">
            <Filter className="h-4 w-4 mr-1" />
            <SelectValue placeholder="Department" />
          </SelectTrigger>
          <SelectContent>
            {departments.map(d => (
              <SelectItem key={d} value={d}>{d === "all" ? "All Departments" : d}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[140px] text-sm">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Present">Present</SelectItem>
            <SelectItem value="Not Present">Not Present</SelectItem>
          </SelectContent>
        </Select>

        <div className="ml-auto flex gap-2">
          <Button size="sm" variant="outline" className="gap-1.5 text-xs">
            <Download className="h-3.5 w-3.5" />
            Excel
          </Button>
          <Button size="sm" variant="outline" className="gap-1.5 text-xs">
            <Download className="h-3.5 w-3.5" />
            PDF
          </Button>
        </div>
      </div>
    </Card>
  );
};
