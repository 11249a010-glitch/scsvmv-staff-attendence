import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Trash2 } from "lucide-react";

interface AttendanceRecord {
  id: string;
  name: string;
  department: string;
  inTime: string;
  outTime: string;
  totalHours: string;
  status: "Present" | "Late" | "Absent";
  date: string;
}

const mockData: AttendanceRecord[] = [
  {
    id: "1",
    name: "Dr. Rajesh Kumar",
    department: "Computer Science",
    inTime: "09:00 AM",
    outTime: "05:30 PM",
    totalHours: "8.5",
    status: "Present",
    date: "2025-01-15",
  },
  {
    id: "2",
    name: "Prof. Priya Sharma",
    department: "Mathematics",
    inTime: "09:15 AM",
    outTime: "05:45 PM",
    totalHours: "8.5",
    status: "Late",
    date: "2025-01-15",
  },
  {
    id: "3",
    name: "Dr. Amit Patel",
    department: "Physics",
    inTime: "08:45 AM",
    outTime: "05:15 PM",
    totalHours: "8.5",
    status: "Present",
    date: "2025-01-15",
  },
  {
    id: "4",
    name: "Mrs. Lakshmi Reddy",
    department: "Chemistry",
    inTime: "09:00 AM",
    outTime: "05:00 PM",
    totalHours: "8.0",
    status: "Present",
    date: "2025-01-15",
  },
  {
    id: "5",
    name: "Prof. Suresh Menon",
    department: "English",
    inTime: "—",
    outTime: "—",
    totalHours: "0",
    status: "Absent",
    date: "2025-01-15",
  },
];

export const AttendanceTable = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Present":
        return "bg-success/10 text-success hover:bg-success/20";
      case "Late":
        return "bg-warning/10 text-warning hover:bg-warning/20";
      case "Absent":
        return "bg-destructive/10 text-destructive hover:bg-destructive/20";
      default:
        return "";
    }
  };

  return (
    <Card className="card-shadow">
      <CardHeader>
        <CardTitle>Today's Attendance Records</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Staff Name</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>In-Time</TableHead>
                <TableHead>Out-Time</TableHead>
                <TableHead>Total Hours</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockData.map((record) => (
                <TableRow key={record.id} className="hover:bg-secondary/50">
                  <TableCell className="font-medium">{record.name}</TableCell>
                  <TableCell>{record.department}</TableCell>
                  <TableCell>{record.inTime}</TableCell>
                  <TableCell>{record.outTime}</TableCell>
                  <TableCell>{record.totalHours} hrs</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(record.status)}>
                      {record.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{record.date}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                        <Trash2 className="h-4 w-4" />
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
