import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { LogIn, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import scsvmvLogo from "@/assets/scsvmv-logo.png";

interface LoginPageProps {
  onLogin: (staff: { employee_code: string; employee_name: string }) => void;
}

const LoginPage = ({ onLogin }: LoginPageProps) => {
  const [employeeCode, setEmployeeCode] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!employeeCode.trim() || !employeeName.trim()) {
      toast({ title: "Error", description: "Please enter both Employee Code and Name.", variant: "destructive" });
      return;
    }

    setLoading(true);

    const { data, error } = await supabase
      .from("staff_attendance")
      .select("employee_code, employee_name")
      .eq("employee_code", employeeCode.trim())
      .ilike("employee_name", `%${employeeName.trim()}%`)
      .limit(1);

    setLoading(false);

    if (error) {
      toast({ title: "Error", description: "Something went wrong. Please try again.", variant: "destructive" });
      return;
    }

    if (data && data.length > 0) {
      localStorage.setItem("staff_session", JSON.stringify({ 
        employee_code: data[0].employee_code, 
        employee_name: data[0].employee_name 
      }));
      onLogin({ employee_code: data[0].employee_code, employee_name: data[0].employee_name });
      toast({ title: "Welcome!", description: `Logged in as ${data[0].employee_name}` });
    } else {
      toast({ 
        title: "Login Failed", 
        description: "Invalid Employee Code or Name. Please check your credentials.", 
        variant: "destructive" 
      });
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <img src={scsvmvLogo} alt="SCSVMV University" className="h-20 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground">SCSVMV University</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Deemed to be University u/s of UGC act 1956
          </p>
        </div>

        <Card className="card-shadow">
          <CardHeader className="pb-4 pt-6 px-6">
            <h2 className="text-lg font-semibold text-center text-foreground">Staff Login</h2>
            <p className="text-xs text-muted-foreground text-center">
              Enter your Employee Code and Name to access the dashboard
            </p>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="empCode" className="text-sm font-medium">Employee Code</Label>
                <Input
                  id="empCode"
                  type="text"
                  placeholder="e.g. 10007"
                  value={employeeCode}
                  onChange={(e) => setEmployeeCode(e.target.value)}
                  className="h-10"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="empName" className="text-sm font-medium">Employee Name</Label>
                <Input
                  id="empName"
                  type="text"
                  placeholder="e.g. Dr.M.GAYATHRI"
                  value={employeeName}
                  onChange={(e) => setEmployeeName(e.target.value)}
                  className="h-10"
                />
              </div>
              <Button
                type="submit"
                className="w-full h-10 bg-[hsl(var(--accent-teal))] hover:bg-[hsl(var(--accent-teal-hover))] text-white font-medium"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <LogIn className="h-4 w-4 mr-2" />
                )}
                {loading ? "Verifying..." : "Login"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-6">
          © 2025 SCSVMV University | Automated Staff Monitoring System
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
