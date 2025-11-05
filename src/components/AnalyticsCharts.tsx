import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const attendanceData = [
  { day: "Mon", present: 45, late: 5, absent: 2 },
  { day: "Tue", present: 48, late: 3, absent: 1 },
  { day: "Wed", present: 47, late: 4, absent: 1 },
  { day: "Thu", present: 46, late: 5, absent: 1 },
  { day: "Fri", present: 44, late: 6, absent: 2 },
];

const departmentData = [
  { name: "Computer Science", value: 95 },
  { name: "Mathematics", value: 92 },
  { name: "Physics", value: 88 },
  { name: "Chemistry", value: 94 },
  { name: "English", value: 90 },
];

const hoursTrendData = [
  { month: "Jan", avgHours: 8.2 },
  { month: "Feb", avgHours: 8.4 },
  { month: "Mar", avgHours: 8.1 },
  { month: "Apr", avgHours: 8.3 },
  { month: "May", avgHours: 8.5 },
];

const COLORS = ['#0053C9', '#00A9FF', '#00D9FF', '#89CFF0', '#B0E0E6'];

export const AnalyticsCharts = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="card-shadow col-span-2">
        <CardHeader>
          <CardTitle>Weekly Attendance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }} 
              />
              <Legend />
              <Bar dataKey="present" fill="hsl(var(--success))" name="Present" />
              <Bar dataKey="late" fill="hsl(var(--warning))" name="Late" />
              <Bar dataKey="absent" fill="hsl(var(--destructive))" name="Absent" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="card-shadow">
        <CardHeader>
          <CardTitle>Department Attendance Rate (%)</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={departmentData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {departmentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }} 
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="card-shadow">
        <CardHeader>
          <CardTitle>Average Working Hours Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={hoursTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }} 
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="avgHours" 
                stroke="hsl(var(--primary))" 
                strokeWidth={3}
                name="Avg Hours"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};
