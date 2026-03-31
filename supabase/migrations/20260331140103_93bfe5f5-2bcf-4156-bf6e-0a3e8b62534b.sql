
-- Create departments table
CREATE TABLE public.departments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create staff_attendance table
CREATE TABLE public.staff_attendance (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  employee_code TEXT NOT NULL,
  employee_name TEXT NOT NULL,
  company TEXT NOT NULL DEFAULT 'SCSVMV',
  department TEXT NOT NULL,
  last_punch TEXT,
  direction TEXT,
  punch_records TEXT,
  status TEXT NOT NULL DEFAULT 'Not Present',
  attendance_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.staff_attendance ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Anyone can view departments" ON public.departments FOR SELECT USING (true);
CREATE POLICY "Anyone can view attendance" ON public.staff_attendance FOR SELECT USING (true);
CREATE POLICY "Anyone can insert attendance" ON public.staff_attendance FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update attendance" ON public.staff_attendance FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete attendance" ON public.staff_attendance FOR DELETE USING (true);
CREATE POLICY "Anyone can insert departments" ON public.departments FOR INSERT WITH CHECK (true);

-- Indexes
CREATE INDEX idx_attendance_date ON public.staff_attendance(attendance_date);
CREATE INDEX idx_attendance_department ON public.staff_attendance(department);
CREATE INDEX idx_attendance_employee_code ON public.staff_attendance(employee_code);

-- Timestamp trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_staff_attendance_updated_at
  BEFORE UPDATE ON public.staff_attendance
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
