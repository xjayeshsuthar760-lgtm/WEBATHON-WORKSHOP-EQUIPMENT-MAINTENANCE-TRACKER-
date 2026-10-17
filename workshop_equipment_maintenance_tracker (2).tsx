import React, { useState, useEffect, useMemo } from 'react';
import {
  Home,
  Cpu,
  Calendar as CalendarIcon,
  Wrench,
  History,
  Users,
  BarChart3,
  Settings,
  Search,
  Bell,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Plus,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Activity,
  Thermometer,
  Gauge,
  Zap,
  ShieldCheck,
  FileText,
  Download,
  Play,
  ArrowUpRight,
  ArrowDownRight,
  SlidersHorizontal,
  Sparkles,
  Check,
  X,
  Eye,
  MapPin,
  UserCheck,
  Layers,
  RefreshCw
} from 'lucide-react';

// ============================================================================
// INITIAL REFERENCE DATASET (MATCHING UPLOADED REFERENCE IMAGE + TELEMETRY)
// ============================================================================
const INITIAL_EQUIPMENT = [
  {
    id: 'EQ-001',
    code: 'CNC-001',
    name: 'CNC Machine',
    fullModel: 'Haas VF-4SS 5-Axis Vertical Machining Center',
    location: 'Bay 1',
    status: 'Running',
    condition: 'Good',
    nextService: '29 Apr 2025',
    technician: 'R. Sharma',
    techRole: 'Senior CNC Specialist',
    techPhone: '+91 98201 44102',
    runtimeHours: 1840,
    serviceIntervalHours: 2000,
    uptimePct: 96,
    temperatureC: 48,
    vibrationMmS: 1.4,
    powerKw: 22.4,
    spindleRpm: '11,500 RPM',
    lastServiceDate: '29 Jan 2025',
    totalRepairCostInr: 42500,
    photo:
      'https://images.unsplash.com/photo-1565439390118-a6222d278c5f?auto=format&fit=crop&w=1000&q=85',
    specs: {
      Serial: 'SN-HAAS-88219',
      Controller: 'NextGen NGC-4',
      Coolant: 'Synthetic 8.5% Brix',
      Voltage: '415V 3-Phase 50Hz'
    },
    notes:
      'Operating within nominal thermal envelope. Scheduled for routine 2000h spindle taper clean and way lube metering inspection on 29 Apr 2025.'
  },
  {
    id: 'EQ-002',
    code: 'LAT-002',
    name: 'Lathe Machine',
    fullModel: 'Mazak Quick Turn 250MSY CNC Turning Center',
    location: 'Bay 2',
    status: 'Running',
    condition: 'Good',
    nextService: '02 May 2025',
    technician: 'S. Patel',
    techRole: 'Lead Turning & Hydraulics Tech',
    techPhone: '+91 98204 77812',
    runtimeHours: 2410,
    serviceIntervalHours: 2500,
    uptimePct: 94,
    temperatureC: 51,
    vibrationMmS: 1.8,
    powerKw: 18.6,
    spindleRpm: '4,800 RPM',
    lastServiceDate: '02 Feb 2025',
    totalRepairCostInr: 31000,
    photo:
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=85',
    specs: {
      Serial: 'SN-MZK-40219',
      ChuckSize: '254mm Hydraulic 3-Jaw',
      Turret: '12-Station VDI Live',
      Voltage: '415V 3-Phase 50Hz'
    },
    notes:
      'Turret index alignment verified at ±0.002mm. Upcoming inspection on 02 May 2025 covers tailstock quill pressure & chuck jaw lubrication.'
  },
  {
    id: 'EQ-003',
    code: 'MIL-003',
    name: 'Milling Machine',
    fullModel: 'DMG MORI DMU 50 Universal Milling Unit',
    location: 'Bay 3',
    status: 'Maintenance',
    condition: 'Fair',
    nextService: '05 May 2025',
    technician: 'A. Khan',
    techRole: 'Electro-Mechanical Engineer',
    techPhone: '+91 98190 33921',
    runtimeHours: 3190,
    serviceIntervalHours: 3200,
    uptimePct: 76,
    temperatureC: 74,
    vibrationMmS: 3.9,
    powerKw: 14.2,
    spindleRpm: '0 RPM (Service Mode)',
    lastServiceDate: '12 Jan 2025',
    totalRepairCostInr: 68500,
    photo:
      'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1000&q=85',
    specs: {
      Serial: 'SN-DMG-55910',
      SpindleTaper: 'SK40 Big-Plus',
      ChillerUnit: 'Active Oil Chiller',
      Voltage: '415V 3-Phase 50Hz'
    },
    notes:
      'ALERT: High spindle bearing temperature (74°C) detected 2 hours ago. Currently isolated in Bay 3 for chiller heat-exchanger flush and bearing preload check.'
  },
  {
    id: 'EQ-004',
    code: 'AC-003',
    name: 'Air Compressor',
    fullModel: 'Ingersoll Rand R37i Rotary Screw Compressor',
    location: 'Utility',
    status: 'Running',
    condition: 'Good',
    nextService: '05 May 2025',
    technician: 'V. Mehta',
    techRole: 'Plant Utilities & Pneumatics Specialist',
    techPhone: '+91 98211 60943',
    runtimeHours: 4720,
    serviceIntervalHours: 5000,
    uptimePct: 99,
    temperatureC: 62,
    vibrationMmS: 1.2,
    powerKw: 37.0,
    spindleRpm: '116 PSI Plant Header',
    lastServiceDate: '05 Nov 2024',
    totalRepairCostInr: 24000,
    photo:
      'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1000&q=85',
    specs: {
      Serial: 'SN-IR-99401',
      AirDelivery: '220 CFM @ 125 PSI',
      DryerType: 'Integrated Refrigerated',
      OilType: 'SSR Ultra Coolant'
    },
    notes:
      'Supplying dry compressed air to all 4 bays. Scheduled oil change and air/oil separator element replacement set for 05 May 2025.'
  },
  {
    id: 'EQ-005',
    code: 'DR-004',
    name: 'Drill Machine',
    fullModel: 'Batliboi BVR-50 Heavy Radial Drilling Machine',
    location: 'Bay 4',
    status: 'Running',
    condition: 'Good',
    nextService: '08 May 2025',
    technician: 'P. Singh',
    techRole: 'Mechanical Maintenance Tech',
    techPhone: '+91 98672 11840',
    runtimeHours: 1590,
    serviceIntervalHours: 1650,
    uptimePct: 91,
    temperatureC: 44,
    vibrationMmS: 1.6,
    powerKw: 7.5,
    spindleRpm: '1,400 RPM',
    lastServiceDate: '08 Feb 2025',
    totalRepairCostInr: 18500,
    photo:
      'https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?auto=format&fit=crop&w=1000&q=85',
    specs: {
      Serial: 'SN-BTL-30912',
      DrillingCap: '50mm Steel / MT5',
      ArmElevation: 'Hydraulic Clamp',
      Voltage: '415V 3-Phase'
    },
    notes:
      'Full service due in 2 days (08 May 2025). Includes column elevating worm gear grease repack and hydraulic arm clamp pressure test.'
  },
  {
    id: 'EQ-006',
    code: 'FL-005',
    name: 'Forklift',
    fullModel: 'Godrej GX 300D 3-Ton Industrial Counterbalance Forklift',
    location: 'Yard',
    status: 'Overdue',
    condition: 'Poor',
    nextService: '10 May 2025',
    technician: 'S. Yadav',
    techRole: 'Material Handling & Hydraulic Tech',
    techPhone: '+91 98335 90127',
    runtimeHours: 3890,
    serviceIntervalHours: 3500,
    uptimePct: 62,
    temperatureC: 68,
    vibrationMmS: 4.4,
    powerKw: 42.0,
    spindleRpm: '2,200 RPM Diesel/Hyd',
    lastServiceDate: '15 Dec 2024',
    totalRepairCostInr: 55500,
    photo:
      'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1000&q=85',
    specs: {
      Serial: 'SN-GDJ-77104',
      LiftCapacity: '3,000 kg @ 500mm LC',
      MastType: '3-Stage Full Free Lift',
      BrakeSystem: 'Wet Disc Hydraulic'
    },
    notes:
      'CRITICAL OVERDUE: Master cylinder brake check & mast tilt cylinder seal replacement overdue by 10 days. Tagged for priority service in Yard.'
  }
];

const INITIAL_UPCOMING = [
  {
    id: 'SCH-101',
    machineId: 'EQ-001',
    title: 'CNC Machine - CNC-001',
    taskType: 'Routine Service',
    category: 'Preventive',
    dueDate: 'Apr 29, 2025',
    calendarDay: 29,
    badge: 'On Track',
    technician: 'R. Sharma',
    estCostInr: 14500,
    checklist: 'Spindle taper clean, coolant refractometer check, X/Y/Z way lube test'
  },
  {
    id: 'SCH-102',
    machineId: 'EQ-002',
    title: 'Lathe Machine - LAT-002',
    taskType: 'Inspection',
    category: 'Inspection',
    dueDate: 'May 2, 2025',
    calendarDay: 2,
    badge: 'On Track',
    technician: 'S. Patel',
    estCostInr: 8500,
    checklist: 'Hydraulic chuck drawtube pressure check & turret alignment verification'
  },
  {
    id: 'SCH-103',
    machineId: 'EQ-004',
    title: 'Air Compressor - AC-003',
    taskType: 'Oil Change',
    category: 'Preventive',
    dueDate: 'May 5, 2025',
    calendarDay: 5,
    badge: 'On Track',
    technician: 'V. Mehta',
    estCostInr: 19000,
    checklist: 'SSR synthetic coolant drain, oil filter & separator element swap'
  },
  {
    id: 'SCH-104',
    machineId: 'EQ-005',
    title: 'Drill Machine - DR-004',
    taskType: 'Full Service',
    category: 'Preventive',
    dueDate: 'May 8, 2025',
    calendarDay: 8,
    badge: 'On Track',
    technician: 'P. Singh',
    estCostInr: 12000,
    checklist: 'Radial arm clamping cylinder service & spindle quill runout test'
  },
  {
    id: 'SCH-105',
    machineId: 'EQ-006',
    title: 'Forklift - FL-005',
    taskType: 'Brake Check',
    category: 'Corrective',
    dueDate: 'May 10, 2025',
    calendarDay: 10,
    badge: 'Due Soon',
    technician: 'S. Yadav',
    estCostInr: 28000,
    checklist: 'Hydraulic wet disc brake overhaul, parking pawl & mast chain tensioning'
  }
];

const INITIAL_ALERTS = [
  {
    id: 'ALT-01',
    machineId: 'EQ-006',
    machineTitle: 'EQ-006 Forklift',
    message: 'Overdue for maintenance',
    timeAgo: '10 days ago',
    severity: 'critical',
    detail: 'Brake hydraulic pressure drop & scheduled 3500h overhaul exceeded by 390 hours.'
  },
  {
    id: 'ALT-02',
    machineId: 'EQ-003',
    machineTitle: 'EQ-003 Milling Machine',
    message: 'High temperature detected',
    timeAgo: '2 hours ago',
    severity: 'warning',
    detail: 'Spindle upper bearing sensor peaked at 74°C (Threshold: 65°C). A. Khan dispatched.'
  },
  {
    id: 'ALT-03',
    machineId: 'EQ-005',
    machineTitle: 'EQ-005 Drill Machine',
    message: 'Service due in 2 days',
    timeAgo: '2 hours ago',
    severity: 'info',
    detail: 'Approaching 1,650 runtime hours. Full mechanical service scheduled with P. Singh.'
  }
];

const INITIAL_HISTORY = [
  {
    woId: 'WO-2025-089',
    date: '26 Apr 2025',
    machineId: 'EQ-003',
    machineName: 'Milling Machine (MIL-003)',
    type: 'Corrective',
    summary: 'Spindle chiller flow valve disassembly & thermal sensor calibration',
    partsUsed: 'PT100 Thermal Probe, Chiller Strainer Kit',
    downtimeHrs: 4.5,
    costInr: 34500,
    technician: 'A. Khan',
    status: 'In Progress'
  },
  {
    woId: 'WO-2025-084',
    date: '21 Apr 2025',
    machineId: 'EQ-001',
    machineName: 'CNC Machine (CNC-001)',
    type: 'Preventive',
    summary: 'Replaced Y-axis telescopic way cover wiper & laser backlash verification',
    partsUsed: 'Haas Polyurethane Way Wiper, Mobil Vactra #2',
    downtimeHrs: 2.0,
    costInr: 28000,
    technician: 'R. Sharma',
    status: 'Completed'
  },
  {
    woId: 'WO-2025-079',
    date: '15 Apr 2025',
    machineId: 'EQ-004',
    machineName: 'Air Compressor (AC-003)',
    type: 'Preventive',
    summary: 'Zero-loss automatic condensate drain valve service & intake filter change',
    partsUsed: 'IR Intake Filter #88171913, Drain Solenoid Diaphragm',
    downtimeHrs: 1.0,
    costInr: 18500,
    technician: 'V. Mehta',
    status: 'Completed'
  },
  {
    woId: 'WO-2025-072',
    date: '09 Apr 2025',
    machineId: 'EQ-002',
    machineName: 'Lathe Machine (LAT-002)',
    type: 'Inspection',
    summary: 'Quarterly hydraulic chuck clamping force & coaxiality inspection',
    partsUsed: 'Kluber Chuck Paste, Hydraulic Pressure Gauge',
    downtimeHrs: 1.5,
    costInr: 14000,
    technician: 'S. Patel',
    status: 'Completed'
  },
  {
    woId: 'WO-2025-065',
    date: '02 Apr 2025',
    machineId: 'EQ-006',
    machineName: 'Forklift (FL-005)',
    type: 'Corrective',
    summary: 'Replaced leaking auxiliary mast tilt cylinder hose & bled hydraulic circuit',
    partsUsed: 'Parker 2SN High-Pressure Hose, 5L AW-68 Hydraulic Oil',
    downtimeHrs: 5.5,
    costInr: 39000,
    technician: 'S. Yadav',
    status: 'Completed'
  }
];

// Uptime & Downtime Spline Data (21 Apr – 28 Apr)
const UPTIME_SERIES = [
  { day: '21 Apr', uptime: 78, downtime: 14 },
  { day: '22 Apr', uptime: 84, downtime: 18 },
  { day: '23 Apr', uptime: 76, downtime: 12 },
  { day: '24 Apr', uptime: 83, downtime: 15 },
  { day: '25 Apr', uptime: 74, downtime: 19 },
  { day: '26 Apr', uptime: 85, downtime: 11 },
  { day: '27 Apr', uptime: 72, downtime: 18 },
  { day: '28 Apr', uptime: 86, downtime: 15 }
];

// Maintenance Cost Trend Data (Week 1 – Week 4)
const COST_TREND_SERIES = {
  'This Month': {
    totalLabel: '₹ 2,40,000',
    delta: '↓ 12%',
    weeks: [
      { label: 'Week 1', valueK: 34, amount: '₹ 34,000' },
      { label: 'Week 2', valueK: 42, amount: '₹ 42,000' },
      { label: 'Week 3', valueK: 39, amount: '₹ 39,000' },
      { label: 'Week 4', valueK: 68, amount: '₹ 68,000' }
    ]
  },
  'Last Quarter': {
    totalLabel: '₹ 6,85,000',
    delta: '↓ 8%',
    weeks: [
      { label: 'Month 1', valueK: 58, amount: '₹ 2,15,000' },
      { label: 'Month 2', valueK: 64, amount: '₹ 2,40,000' },
      { label: 'Month 3', valueK: 49, amount: '₹ 1,80,000' },
      { label: 'Current', valueK: 52, amount: '₹ 2,40,000' }
    ]
  }
};

// April 2025 Calendar Events Map matching reference image
const APRIL_2025_EVENTS = {
  4: ['overdue'],
  6: ['scheduled'],
  8: ['scheduled'],
  9: ['in-progress'],
  13: ['scheduled'],
  19: ['scheduled', 'in-progress'],
  24: ['in-progress'],
  26: ['scheduled'],
  27: ['scheduled', 'overdue'],
  28: ['today'],
  29: ['scheduled']
};

export default function App() {
  // Persistent State
  const [equipment, setEquipment] = useState(INITIAL_EQUIPMENT);
  const [upcomingList, setUpcomingList] = useState(INITIAL_UPCOMING);
  const [alerts, setAlerts] = useState(INITIAL_ALERTS);
  const [historyList, setHistoryList] = useState(INITIAL_HISTORY);

  // Selection & Filter State for the "Beside" Detail Inspector
  const [selectedMachineId, setSelectedMachineId] = useState('EQ-001');
  const [besideTab, setBesideTab] = useState('telemetry'); // 'telemetry' | 'schedule' | 'history'
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All'); // 'All' | 'Running' | 'Maintenance' | 'Overdue'
  const [activeNavSection, setActiveNavSection] = useState('sec-dashboard');
  const [costPeriod, setCostPeriod] = useState('This Month');
  const [selectedCalDay, setSelectedCalDay] = useState(28);
  const [toastMsg, setToastMsg] = useState(null);

  // Modals State
  const [modalMode, setModalMode] = useState(null); // 'add-equipment' | 'create-wo' | 'schedule-pm' | null

  // Form states for Quick Action modals
  const [newEqForm, setNewEqForm] = useState({
    name: '',
    fullModel: '',
    location: 'Bay 1',
    status: 'Running',
    condition: 'Good',
    nextService: '15 May 2025',
    technician: 'R. Sharma'
  });

  const [newWoForm, setNewWoForm] = useState({
    machineId: 'EQ-001',
    type: 'Preventive',
    summary: '',
    partsUsed: '',
    downtimeHrs: 2,
    costInr: 15000,
    technician: 'R. Sharma'
  });

  const triggerToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3400);
  };

  // Currently Inspected Machine in the "Beside" Panel
  const selectedMachine = useMemo(() => {
    return equipment.find((item) => item.id === selectedMachineId) || equipment[0];
  }, [equipment, selectedMachineId]);

  // Filtered Equipment Inventory Table
  const filteredEquipment = useMemo(() => {
    return equipment.filter((item) => {
      const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.id.toLowerCase().includes(q) ||
        item.name.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q) ||
        item.technician.toLowerCase().includes(q) ||
        item.fullModel.toLowerCase().includes(q);
      return matchesStatus && matchesSearch;
    });
  }, [equipment, statusFilter, searchQuery]);

  // Filtered Service History
  const filteredHistory = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return historyList;
    return historyList.filter(
      (h) =>
        h.woId.toLowerCase().includes(q) ||
        h.machineName.toLowerCase().includes(q) ||
        h.summary.toLowerCase().includes(q) ||
        h.technician.toLowerCase().includes(q)
    );
  }, [historyList, searchQuery]);

  // Dynamic KPIs (scaled to match reference image numbers + live additions)
  const kpiStats = useMemo(() => {
    const extraCount = equipment.length - INITIAL_EQUIPMENT.length;
    const runningExtra = equipment.filter((e) => e.status === 'Running').length - 4;
    const maintCount = equipment.filter((e) => e.status === 'Maintenance').length + 2;
    const overdueCount = equipment.filter((e) => e.status === 'Overdue').length;
    const totalMachines = 24 + extraCount;
    const activeMachines = 20 + runningExtra;
    const availabilityPct = Math.min(99, Math.round((activeMachines / totalMachines) * 100));
    return {
      totalMachines,
      activeMachines,
      maintCount,
      overdueCount,
      availabilityPct
    };
  }, [equipment]);

  // Scroll-Spy for Linear Pages Sidebar Highlighting
  useEffect(() => {
    const sections = [
      'sec-dashboard',
      'sec-analytics',
      'sec-inventory',
      'sec-schedule',
      'sec-history'
    ];
    const handleScroll = () => {
      const scrollY = window.scrollY + 220;
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && scrollY >= el.offsetTop && scrollY < el.offsetTop + el.offsetHeight) {
          setActiveNavSection(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToLinearSection = (sectionId) => {
    setActiveNavSection(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Interactive Handlers
  const handleSelectMachine = (machineId, preferredTab) => {
    setSelectedMachineId(machineId);
    if (preferredTab) setBesideTab(preferredTab);
  };

  const handleLogShiftHours = (machineId) => {
    setEquipment((prev) =>
      prev.map((m) =>
        m.id === machineId ? { ...m, runtimeHours: m.runtimeHours + 8 } : m
      )
    );
    triggerToast(`Logged +8h shift runtime on ${machineId}`);
  };

  const handleCompleteService = (machineId) => {
    const target = equipment.find((m) => m.id === machineId);
    if (!target) return;

    setEquipment((prev) =>
      prev.map((m) =>
        m.id === machineId
          ? {
              ...m,
              status: 'Running',
              condition: 'Good',
              temperatureC: 46,
              vibrationMmS: 1.3,
              nextService: '28 Jul 2025',
              serviceIntervalHours: m.runtimeHours + 500
            }
          : m
      )
    );

    const newWo = {
      woId: `WO-2025-0${90 + historyList.length}`,
      date: '28 Apr 2025',
      machineId: target.id,
      machineName: `${target.name} (${target.code})`,
      type: 'Preventive',
      summary: `Completed scheduled maintenance & restored ${target.name} to optimal running state`,
      partsUsed: 'OEM Filter & Lubrication Service Pack',
      downtimeHrs: 1.5,
      costInr: 16500,
      technician: target.technician,
      status: 'Completed'
    };

    setHistoryList((prev) => [newWo, ...prev]);
    setAlerts((prev) => prev.filter((a) => a.machineId !== machineId));
    triggerToast(`${target.id} (${target.name}) marked Running & logged under ${newWo.woId}`);
  };

  const handleAddEquipmentSubmit = (e) => {
    e.preventDefault();
    const nextNum = equipment.length + 1;
    const newId = `EQ-00${nextNum}`;
    const newMachine = {
      id: newId,
      code: `MCH-00${nextNum}`,
      name: newEqForm.name,
      fullModel: newEqForm.fullModel || `${newEqForm.name} Industrial Unit`,
      location: newEqForm.location,
      status: newEqForm.status,
      condition: newEqForm.condition,
      nextService: newEqForm.nextService,
      technician: newEqForm.technician,
      techRole: 'Assigned Workshop Specialist',
      techPhone: '+91 98200 11223',
      runtimeHours: 420,
      serviceIntervalHours: 1000,
      uptimePct: 97,
      temperatureC: 45,
      vibrationMmS: 1.2,
      powerKw: 15.0,
      spindleRpm: '6,000 RPM',
      lastServiceDate: '15 Mar 2025',
      totalRepairCostInr: 12000,
      photo:
        'https://images.unsplash.com/photo-1565439390118-a6222d278c5f?auto=format&fit=crop&w=1000&q=85',
      specs: {
        Serial: `SN-IND-${9000 + nextNum}`,
        Controller: 'Digital PLC Telemetry',
        Voltage: '415V 3-Phase 50Hz'
      },
      notes: 'Newly commissioned workshop asset monitored via real-time telemetry.'
    };
    setEquipment((prev) => [newMachine, ...prev]);
    setSelectedMachineId(newId);
    setModalMode(null);
    setNewEqForm({
      name: '',
      fullModel: '',
      location: 'Bay 1',
      status: 'Running',
      condition: 'Good',
      nextService: '15 May 2025',
      technician: 'R. Sharma'
    });
    triggerToast(`Added ${newMachine.name} (${newId}) to Equipment Inventory`);
  };

  const handleCreateWorkOrderSubmit = (e) => {
    e.preventDefault();
    const target = equipment.find((m) => m.id === newWoForm.machineId) || equipment[0];
    const createdWo = {
      woId: `WO-2025-0${91 + historyList.length}`,
      date: '28 Apr 2025',
      machineId: target.id,
      machineName: `${target.name} (${target.code})`,
      type: newWoForm.type,
      summary: newWoForm.summary,
      partsUsed: newWoForm.partsUsed || 'Standard OEM Consumables',
      downtimeHrs: Number(newWoForm.downtimeHrs) || 1.5,
      costInr: Number(newWoForm.costInr) || 12000,
      technician: newWoForm.technician,
      status: 'Completed'
    };
    setHistoryList((prev) => [createdWo, ...prev]);
    setSelectedMachineId(target.id);
    setBesideTab('history');
    setModalMode(null);
    triggerToast(`Logged Work Order ${createdWo.woId} for ${target.name}`);
  };

  const handleExportCSV = () => {
    const headers = [
      'WorkOrder_ID',
      'Date',
      'Equipment_ID',
      'Equipment_Name',
      'Type',
      'Technician',
      'Downtime_Hrs',
      'Cost_INR',
      'Status',
      'Summary'
    ];
    const rows = historyList.map((h) => [
      h.woId,
      h.date,
      h.machineId,
      `"${h.machineName}"`,
      h.type,
      `"${h.technician}"`,
      h.downtimeHrs,
      h.costInr,
      h.status,
      `"${h.summary.replace(/"/g, '""')}"`
    ]);
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', 'workshop_maintenance_service_history.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerToast('Exported Workshop Service & Repair History to CSV');
  };

  return (
    <div className="min-h-screen bg-[#060D1A] text-[#F8FAFC] font-body selection:bg-sky-500/30 selection:text-sky-200 overflow-x-hidden">
      {/* ====================================================================
          PREMIUM FONTS & MOTION KEYFRAMES INJECTION
         ==================================================================== */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap');

        .font-display { font-family: 'Plus Jakarta Sans', sans-serif; }
        .font-body { font-family: 'Inter', sans-serif; }
        .font-mono-tech { font-family: 'JetBrains Mono', monospace; font-variant-numeric: tabular-nums; }

        @keyframes pulseGlow {
          0%, 100% { opacity: 0.65; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.06); }
        }
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spinReverseSlow {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes floatSubtle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }
        .animate-spin-slow { animation: spinSlow 22s linear infinite; }
        .animate-spin-reverse { animation: spinReverseSlow 16s linear infinite; }
        .animate-float { animation: floatSubtle 4.5s ease-in-out infinite; }

        .cyber-card {
          background: linear-gradient(180deg, rgba(16, 31, 56, 0.88) 0%, rgba(10, 20, 38, 0.94) 100%);
          border: 1px solid rgba(56, 189, 248, 0.16);
          box-shadow: 0 12px 32px -8px rgba(0, 0, 0, 0.65), inset 0 1px 0 0 rgba(255, 255, 255, 0.07);
          backdrop-filter: blur(16px);
          transition: all 0.28s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .cyber-card:hover {
          border-color: rgba(56, 189, 248, 0.36);
          box-shadow: 0 16px 40px -8px rgba(2, 132, 199, 0.22), inset 0 1px 0 0 rgba(255, 255, 255, 0.12);
        }

        /* Custom subtle dark scrollbar */
        ::-webkit-scrollbar { width: 7px; height: 7px; }
        ::-webkit-scrollbar-track { background: #060D1A; }
        ::-webkit-scrollbar-thumb { background: #1E3A5F; border-radius: 9999px; }
        ::-webkit-scrollbar-thumb:hover { background: #0EA5E9; }
      `}</style>

      {/* ====================================================================
          TOP GLOBAL TELEMETRY HEADER BAR (MATCHING REFERENCE IMAGE)
         ==================================================================== */}
      <header className="fixed top-0 left-0 right-0 h-16 z-50 bg-[#071020]/95 backdrop-blur-xl border-b border-sky-500/20 px-4 lg:px-6 flex items-center justify-between gap-4 shadow-2xl">
        {/* Left Brand Title & Glowing Gear Icon */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500/30 to-blue-700/30 border border-sky-400/40 flex items-center justify-center shadow-[0_0_20px_rgba(14,165,233,0.35)]">
              <Settings className="w-6 h-6 text-sky-400 animate-spin-slow" />
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-[#071020]" />
            </div>
            <div>
              <span className="font-display font-bold text-sm sm:text-base tracking-tight text-white block leading-tight">
                Workshop Equipment &
              </span>
              <span className="font-display font-bold text-sm sm:text-base tracking-tight text-sky-400 block leading-tight">
                Maintenance Tracker
              </span>
            </div>
          </div>

          {/* Reference Image Tagline Dividers */}
          <div className="hidden xl:flex items-center gap-3 pl-4 border-l border-slate-700/70 text-xs font-medium text-slate-300">
            <span className="hover:text-sky-400 transition-colors cursor-default">Safer Machines</span>
            <span className="text-slate-600">|</span>
            <span className="hover:text-emerald-400 transition-colors cursor-default">Higher Uptime</span>
            <span className="text-slate-600">|</span>
            <span className="hover:text-amber-400 transition-colors cursor-default">Greater Productivity</span>
          </div>
        </div>

        {/* Center/Right Search Input + Notification Bell + Jayesh Suthar Profile */}
        <div className="flex items-center gap-3 sm:gap-5">
          <div className="relative w-48 sm:w-80 lg:w-96">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search equipment, work order, technician..."
              className="w-full pl-4 pr-10 py-2 rounded-lg bg-[#0C192E] border border-sky-500/25 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-500/20 transition-all"
            />
            <Search className="w-4 h-4 text-sky-400 absolute right-3 top-1/2 -translate-y-1/2" />
          </div>

          {/* Notification Bell with Badge "3" */}
          <button
            onClick={() => scrollToLinearSection('sec-schedule')}
            title="View Active Workshop Alerts"
            className="relative p-2 rounded-lg bg-[#0C192E] hover:bg-sky-500/15 border border-sky-500/20 text-slate-200 transition-colors"
          >
            <Bell className="w-4 h-4 text-sky-300" />
            <span className="absolute -top-1.5 -right-1.5 px-1.5 py-0.2 min-w-[18px] h-[18px] rounded-full bg-rose-500 text-white font-mono-tech text-[10px] font-bold flex items-center justify-center shadow-[0_0_10px_rgba(244,63,94,0.8)]">
              {alerts.length}
            </span>
          </button>

          {/* Administrator Profile matching "Jayesh Suthar" */}
          <div className="flex items-center gap-2.5 pl-2 sm:pl-4 border-l border-slate-800">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
              alt="Jayesh Suthar"
              className="w-9 h-9 rounded-full object-cover border-2 border-sky-400/60 shadow-[0_0_12px_rgba(56,189,248,0.3)]"
            />
            <div className="hidden sm:block text-left">
              <div className="text-xs font-display font-bold text-white leading-none">
                Jayesh Suthar
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">Administrator</div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
          </div>
        </div>
      </header>

      {/* ====================================================================
          MAIN LAYOUT: FIXED LEFT SIDEBAR + LINEAR SCROLL + BESIDE INSPECTOR
         ==================================================================== */}
      <div className="pt-16 flex min-h-screen">
        {/* LEFT FIXED SIDEBAR (MATCHING REFERENCE NAVIGATION & INDUSTRIAL PHOTO) */}
        <aside className="hidden lg:flex w-60 flex-col justify-between fixed top-16 bottom-0 left-0 z-40 bg-[#071122] border-r border-sky-500/15 select-none overflow-y-auto">
          <div className="p-3.5 space-y-1.5">
            {[
              { id: 'sec-dashboard', label: 'Dashboard', icon: Home },
              { id: 'sec-inventory', label: 'Equipment Inventory', icon: Cpu },
              { id: 'sec-schedule', label: 'Maintenance Schedule', icon: CalendarIcon },
              { id: 'sec-history', label: 'Work Orders', icon: Wrench },
              { id: 'sec-history', label: 'Service History', icon: History, subKey: 'service' },
              { id: 'sec-inventory', label: 'Technicians', icon: Users, subKey: 'tech' },
              { id: 'sec-analytics', label: 'Reports & Analytics', icon: BarChart3 }
            ].map((item, idx) => {
              const IconComponent = item.icon;
              const isActive = activeNavSection === item.id && !item.subKey;
              return (
                <button
                  key={`${item.label}-${idx}`}
                  onClick={() => {
                    if (item.subKey === 'tech') {
                      setBesideTab('telemetry');
                    }
                    scrollToLinearSection(item.id);
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold shadow-[0_0_20px_rgba(14,165,233,0.45)]'
                      : 'text-slate-300 hover:bg-sky-500/10 hover:text-white'
                  }`}
                >
                  <IconComponent className={`w-4 h-4 ${isActive ? 'text-white' : 'text-sky-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}

            <button
              onClick={() => setModalMode('add-equipment')}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-slate-300 hover:bg-sky-500/10 hover:text-white transition-all"
            >
              <Settings className="w-4 h-4 text-sky-400" />
              <span>Settings & Assets</span>
            </button>
          </div>

          {/* Bottom Sidebar Atmospheric Industrial Card (Exact Reference Quote) */}
          <div className="p-3.5">
            <div className="relative rounded-2xl overflow-hidden border border-sky-500/25 shadow-xl group">
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80"
                alt="Industrial Workshop Floor"
                className="w-full h-48 object-cover object-center brightness-50 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050C18] via-[#050C18]/70 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex items-start gap-2.5">
                <div className="p-2 rounded-lg bg-sky-500/20 border border-sky-400/40 text-sky-300 shrink-0 mt-0.5">
                  <Settings className="w-4 h-4 animate-spin-slow" />
                </div>
                <p className="text-xs font-display font-semibold text-slate-100 leading-snug">
                  Well Maintained Equipment Builds a Stronger Tomorrow
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* ==================================================================
            CENTER + RIGHT WORKSPACE CONTAINER
           ================================================================== */}
        <div className="flex-1 lg:ml-60 px-4 sm:px-6 py-5">
          <div className="max-w-[1600px] mx-auto grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
            {/* ==============================================================
                LEFT/CENTER 8 COLUMNS: LINEAR SCROLLING PAGE SECTIONS
               ============================================================== */}
            <div className="xl:col-span-8 space-y-6">
              {/* ------------------------------------------------------------
                  LINEAR SECTION 1: HERO BANNER + 5 GLOWING KPI CARDS
                 ------------------------------------------------------------ */}
              <section id="sec-dashboard" className="scroll-mt-20 space-y-5">
                {/* Welcome Hero Banner matching "Good Morning, Jayesh!" */}
                <div className="relative rounded-2xl overflow-hidden border border-sky-500/30 bg-gradient-to-r from-[#0B1930] via-[#0E2240] to-[#091D36] p-5 sm:p-6 shadow-[0_10px_35px_rgba(0,0,0,0.6)]">
                  {/* Subtle glowing background grid */}
                  <div
                    className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{
                      backgroundImage:
                        'radial-gradient(circle at 80% 50%, rgba(14, 165, 233, 0.45), transparent 60%), linear-gradient(to right, rgba(56,189,248,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(56,189,248,0.08) 1px, transparent 1px)',
                      backgroundSize: '100% 100%, 24px 24px, 24px 24px'
                    }}
                  />

                  <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-sky-500/15 border border-sky-400/30 text-sky-300 text-[11px] font-medium mb-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                        <span>Live Shopfloor Telemetry Active • Linear View</span>
                      </div>
                      <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                        Good Morning, Jayesh!
                      </h1>
                      <p className="text-xs sm:text-sm text-slate-300 mt-1">
                        Here&apos;s what&apos;s happening with your workshop equipment today.
                      </p>
                    </div>

                    {/* Center Date/Time Stamp + Right Cyber Graphic */}
                    <div className="flex flex-wrap items-center gap-5">
                      <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-[#071224]/90 border border-sky-500/25">
                        <CalendarIcon className="w-4 h-4 text-sky-400" />
                        <div className="font-mono-tech text-xs">
                          <div className="text-slate-100 font-semibold">Mon, 28 Apr 2025</div>
                          <div className="text-sky-400 text-[11px]">11:00 AM IST</div>
                        </div>
                      </div>

                      {/* Animated Cyber-Industrial Gear & Robotic Graphic + TRACK MAINTAIN MAXIMIZE */}
                      <div className="flex items-center gap-3 pl-3 border-l border-sky-500/20">
                        <div className="relative w-12 h-12 flex items-center justify-center">
                          <Settings className="w-11 h-11 text-sky-400/80 animate-spin-slow" />
                          <Cpu className="w-5 h-5 text-emerald-400 absolute" />
                        </div>
                        <div className="font-display font-extrabold text-xs tracking-wider leading-tight">
                          <div className="text-sky-300">TRACK</div>
                          <div className="text-cyan-400">MAINTAIN</div>
                          <div className="text-emerald-400">MAXIMIZE</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 5 Glowing Neon KPI Cards (Click to Filter Inventory) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
                  {/* Card 1: Total Equipment */}
                  <button
                    onClick={() => {
                      setStatusFilter('All');
                      scrollToLinearSection('sec-inventory');
                    }}
                    className={`text-left p-4 rounded-2xl border transition-all animate-float ${
                      statusFilter === 'All'
                        ? 'bg-gradient-to-br from-sky-950/90 via-[#0C1D36] to-[#081326] border-sky-400/60 shadow-[0_0_25px_rgba(14,165,233,0.25)]'
                        : 'cyber-card'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-full bg-sky-500/20 border border-sky-400/50 flex items-center justify-center shadow-[0_0_15px_rgba(14,165,233,0.4)] shrink-0">
                        <Cpu className="w-5 h-5 text-sky-300" />
                      </div>
                      <div>
                        <div className="text-xs font-medium text-slate-300">Total Equipment</div>
                        <div className="flex items-baseline gap-2 mt-0.5">
                          <span className="font-display font-extrabold text-2xl text-white font-mono-tech">
                            {kpiStats.totalMachines}
                          </span>
                          <span className="text-[11px] font-mono-tech font-semibold text-emerald-400">
                            ↑ 2%
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-[11px] text-sky-300/80 mt-2.5 truncate">
                      Active machines in workshop
                    </div>
                  </button>

                  {/* Card 2: Active Machines */}
                  <button
                    onClick={() => {
                      setStatusFilter('Running');
                      scrollToLinearSection('sec-inventory');
                    }}
                    className={`text-left p-4 rounded-2xl border transition-all ${
                      statusFilter === 'Running'
                        ? 'bg-gradient-to-br from-emerald-950/90 via-[#0B2228] to-[#081520] border-emerald-400/60 shadow-[0_0_25px_rgba(16,185,129,0.25)]'
                        : 'bg-gradient-to-br from-emerald-950/40 to-[#091728] border-emerald-500/30 hover:border-emerald-400/60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-full bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.4)] shrink-0">
                        <CheckCircle2 className="w-5 h-5 text-emerald-300" />
                      </div>
                      <div>
                        <div className="text-xs font-medium text-slate-300">Active Machines</div>
                        <div className="flex items-baseline gap-2 mt-0.5">
                          <span className="font-display font-extrabold text-2xl text-white font-mono-tech">
                            {kpiStats.activeMachines}
                          </span>
                          <span className="text-[11px] font-mono-tech font-semibold text-emerald-400">
                            ↑ 5%
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-[11px] text-emerald-300/80 mt-2.5 truncate">
                      Running without issues
                    </div>
                  </button>

                  {/* Card 3: Under Maintenance */}
                  <button
                    onClick={() => {
                      setStatusFilter('Maintenance');
                      scrollToLinearSection('sec-inventory');
                    }}
                    className={`text-left p-4 rounded-2xl border transition-all ${
                      statusFilter === 'Maintenance'
                        ? 'bg-gradient-to-br from-amber-950/90 via-[#241B12] to-[#0A1322] border-amber-400/60 shadow-[0_0_25px_rgba(245,158,11,0.25)]'
                        : 'bg-gradient-to-br from-amber-950/40 to-[#091728] border-amber-500/30 hover:border-amber-400/60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-full bg-amber-500/20 border border-amber-400/50 flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.4)] shrink-0">
                        <Wrench className="w-5 h-5 text-amber-300" />
                      </div>
                      <div>
                        <div className="text-xs font-medium text-slate-300">Under Maintenance</div>
                        <div className="flex items-baseline gap-2 mt-0.5">
                          <span className="font-display font-extrabold text-2xl text-white font-mono-tech">
                            {kpiStats.maintCount}
                          </span>
                          <span className="text-[11px] font-mono-tech font-semibold text-amber-400">
                            ↓ 1%
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-[11px] text-amber-300/80 mt-2.5 truncate">
                      Scheduled / In Progress
                    </div>
                  </button>

                  {/* Card 4: Overdue Maintenance */}
                  <button
                    onClick={() => {
                      setStatusFilter('Overdue');
                      scrollToLinearSection('sec-inventory');
                    }}
                    className={`text-left p-4 rounded-2xl border transition-all ${
                      statusFilter === 'Overdue'
                        ? 'bg-gradient-to-br from-rose-950/90 via-[#28111B] to-[#0A1322] border-rose-400/60 shadow-[0_0_25px_rgba(244,63,94,0.3)]'
                        : 'bg-gradient-to-br from-rose-950/45 to-[#091728] border-rose-500/30 hover:border-rose-400/60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-full bg-rose-500/20 border border-rose-400/50 flex items-center justify-center shadow-[0_0_15px_rgba(244,63,94,0.45)] shrink-0">
                        <AlertTriangle className="w-5 h-5 text-rose-300" />
                      </div>
                      <div>
                        <div className="text-xs font-medium text-slate-300">Overdue Maint.</div>
                        <div className="flex items-baseline gap-2 mt-0.5">
                          <span className="font-display font-extrabold text-2xl text-white font-mono-tech">
                            {kpiStats.overdueCount}
                          </span>
                          <span className="text-[11px] font-mono-tech font-semibold text-rose-400">
                            ↑ 1%
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-[11px] text-rose-300/80 mt-2.5 truncate">
                      Requires immediate attention
                    </div>
                  </button>

                  {/* Card 5: Equipment Availability */}
                  <button
                    onClick={() => scrollToLinearSection('sec-analytics')}
                    className="text-left p-4 rounded-2xl border bg-gradient-to-br from-cyan-950/50 to-[#091728] border-cyan-500/30 hover:border-cyan-400/60 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-full bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.4)] shrink-0">
                        <span className="font-mono-tech font-bold text-sm text-cyan-300">%</span>
                      </div>
                      <div>
                        <div className="text-xs font-medium text-slate-300">Availability</div>
                        <div className="flex items-baseline gap-2 mt-0.5">
                          <span className="font-display font-extrabold text-2xl text-white font-mono-tech">
                            {kpiStats.availabilityPct}%
                          </span>
                          <span className="text-[11px] font-mono-tech font-semibold text-emerald-400">
                            ↑ 4%
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-[11px] text-cyan-300/80 mt-2.5 truncate">
                      Target &gt; 80%
                    </div>
                  </button>
                </div>
              </section>

              {/* ------------------------------------------------------------
                  LINEAR SECTION 2: TELEMETRY CHARTS (UPTIME & COST TREND)
                 ------------------------------------------------------------ */}
              <section id="sec-analytics" className="scroll-mt-20 grid grid-cols-1 lg:grid-cols-12 gap-5">
                {/* Equipment Uptime & Downtime Area Spline + 83% Radial Gauge */}
                <div className="lg:col-span-7 cyber-card rounded-2xl p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 rounded-lg bg-sky-500/15 border border-sky-400/30 text-sky-400">
                        <Activity className="w-4 h-4" />
                      </div>
                      <h2 className="font-display font-bold text-sm sm:text-base text-white">
                        Equipment Uptime & Downtime
                      </h2>
                    </div>
                    <div className="flex items-center gap-4 text-xs">
                      <span className="flex items-center gap-1.5 text-slate-300">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#10B981]" />
                        Uptime
                      </span>
                      <span className="flex items-center gap-1.5 text-slate-300">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_#F59E0B]" />
                        Downtime
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                    {/* Dual Glowing Spline SVG Chart */}
                    <div className="sm:col-span-8">
                      <svg viewBox="0 0 420 175" className="w-full h-44 overflow-visible">
                        <defs>
                          <linearGradient id="uptimeFill" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#10B981" stopOpacity="0.38" />
                            <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                          </linearGradient>
                          <linearGradient id="downtimeFill" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.32" />
                            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>

                        {/* Horizontal Grid Lines */}
                        {[
                          { y: 20, label: '100%' },
                          { y: 52, label: '75%' },
                          { y: 84, label: '50%' },
                          { y: 116, label: '25%' },
                          { y: 148, label: '0%' }
                        ].map((g) => (
                          <g key={g.label}>
                            <line
                              x1="36"
                              y1={g.y}
                              x2="405"
                              y2={g.y}
                              stroke="rgba(148, 163, 184, 0.12)"
                              strokeDasharray="3 3"
                            />
                            <text
                              x="0"
                              y={g.y + 4}
                              fill="#94A3B8"
                              fontSize="9"
                              className="font-mono-tech"
                            >
                              {g.label}
                            </text>
                          </g>
                        ))}

                        {/* Uptime Area & Smooth Curve */}
                        <path
                          d="M 45 48 C 70 48, 82 36, 96 36 C 115 36, 130 50, 147 50 C 168 50, 180 38, 198 38 C 216 38, 232 52, 249 52 C 268 52, 282 35, 300 35 C 318 35, 334 54, 351 54 C 370 54, 385 34, 402 34 L 402 148 L 45 148 Z"
                          fill="url(#uptimeFill)"
                        />
                        <path
                          d="M 45 48 C 70 48, 82 36, 96 36 C 115 36, 130 50, 147 50 C 168 50, 180 38, 198 38 C 216 38, 232 52, 249 52 C 268 52, 282 35, 300 35 C 318 35, 334 54, 351 54 C 370 54, 385 34, 402 34"
                          fill="none"
                          stroke="#10B981"
                          strokeWidth="2.5"
                        />

                        {/* Downtime Area & Curve */}
                        <path
                          d="M 45 130 C 70 130, 82 122, 96 122 C 115 122, 130 134, 147 134 C 168 134, 180 126, 198 126 C 216 126, 232 120, 249 120 C 268 120, 282 135, 300 135 C 318 135, 334 123, 351 123 C 370 123, 385 129, 402 129 L 402 148 L 45 148 Z"
                          fill="url(#downtimeFill)"
                        />
                        <path
                          d="M 45 130 C 70 130, 82 122, 96 122 C 115 122, 130 134, 147 134 C 168 134, 180 126, 198 126 C 216 126, 232 120, 249 120 C 268 120, 282 135, 300 135 C 318 135, 334 123, 351 123 C 370 123, 385 129, 402 129"
                          fill="none"
                          stroke="#F59E0B"
                          strokeWidth="2.2"
                        />

                        {/* Data Nodes & X-Axis Dates */}
                        {[
                          { x: 45, uy: 48, dy: 130, d: '21 Apr' },
                          { x: 96, uy: 36, dy: 122, d: '22 Apr' },
                          { x: 147, uy: 50, dy: 134, d: '23 Apr' },
                          { x: 198, uy: 38, dy: 126, d: '24 Apr' },
                          { x: 249, uy: 52, dy: 120, d: '25 Apr' },
                          { x: 300, uy: 35, dy: 135, d: '26 Apr' },
                          { x: 351, uy: 54, dy: 123, d: '27 Apr' },
                          { x: 402, uy: 34, dy: 129, d: '28 Apr' }
                        ].map((pt) => (
                          <g key={pt.d}>
                            <circle
                              cx={pt.x}
                              cy={pt.uy}
                              r="3.5"
                              fill="#10B981"
                              stroke="#060D1A"
                              strokeWidth="1.5"
                            />
                            <circle
                              cx={pt.x}
                              cy={pt.dy}
                              r="3"
                              fill="#F59E0B"
                              stroke="#060D1A"
                              strokeWidth="1.5"
                            />
                            <text
                              x={pt.x}
                              y="166"
                              textAnchor="middle"
                              fill="#94A3B8"
                              fontSize="9"
                              className="font-mono-tech"
                            >
                              {pt.d}
                            </text>
                          </g>
                        ))}
                      </svg>
                    </div>

                    {/* 83% Overall Uptime Radial Gauge */}
                    <div className="sm:col-span-4 flex flex-col items-center justify-center border-t sm:border-t-0 sm:border-l border-slate-800/80 pt-4 sm:pt-0">
                      <div className="relative w-32 h-32 flex items-center justify-center">
                        <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                          <circle
                            cx="60"
                            cy="60"
                            r="48"
                            stroke="rgba(30, 58, 95, 0.5)"
                            strokeWidth="11"
                            fill="none"
                          />
                          <circle
                            cx="60"
                            cy="60"
                            r="48"
                            stroke="#10B981"
                            strokeWidth="11"
                            strokeDasharray="301.59"
                            strokeDashoffset={301.59 * (1 - kpiStats.availabilityPct / 100)}
                            strokeLinecap="round"
                            fill="none"
                            style={{ filter: 'drop-shadow(0 0 8px rgba(16, 185, 129, 0.6))' }}
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="font-display font-extrabold text-2xl text-white font-mono-tech">
                            {kpiStats.availabilityPct}%
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-medium text-slate-300 mt-1">
                        Overall Uptime
                      </span>
                    </div>
                  </div>
                </div>

                {/* Maintenance Cost Trend (₹ 2,40,000 + Bar/Line Combo) */}
                <div className="lg:col-span-5 cyber-card rounded-2xl p-5 flex flex-col justify-between">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-sky-500/15 border border-sky-400/30 text-sky-400">
                        <BarChart3 className="w-4 h-4" />
                      </div>
                      <h2 className="font-display font-bold text-sm sm:text-base text-white">
                        Maintenance Cost Trend
                      </h2>
                    </div>

                    <select
                      value={costPeriod}
                      onChange={(e) => setCostPeriod(e.target.value)}
                      aria-label="Select Cost Trend Period"
                      className="px-2.5 py-1 rounded-lg bg-[#0B192E] border border-sky-500/30 text-xs text-slate-200 focus:outline-none"
                    >
                      <option value="This Month">This Month</option>
                      <option value="Last Quarter">Last Quarter</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-12 gap-3 items-center my-auto">
                    {/* Bar + Line Combo SVG */}
                    <div className="col-span-7">
                      <svg viewBox="0 0 230 155" className="w-full h-40 overflow-visible">
                        <defs>
                          <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#38BDF8" />
                            <stop offset="100%" stopColor="#0284C7" />
                          </linearGradient>
                        </defs>
                        {[
                          { y: 18, l: '₹ 80K' },
                          { y: 48, l: '₹ 60K' },
                          { y: 78, l: '₹ 40K' },
                          { y: 108, l: '₹ 20K' },
                          { y: 134, l: '₹ 0' }
                        ].map((row) => (
                          <g key={row.l}>
                            <line
                              x1="38"
                              y1={row.y}
                              x2="220"
                              y2={row.y}
                              stroke="rgba(148,163,184,0.12)"
                              strokeDasharray="2 2"
                            />
                            <text
                              x="0"
                              y={row.y + 3}
                              fill="#94A3B8"
                              fontSize="8.5"
                              className="font-mono-tech"
                            >
                              {row.l}
                            </text>
                          </g>
                        ))}

                        {/* Bars */}
                        {COST_TREND_SERIES[costPeriod].weeks.map((w, idx) => {
                          const x = 52 + idx * 44;
                          const barH = (w.valueK / 80) * 116;
                          const y = 134 - barH;
                          return (
                            <g key={w.label}>
                              <rect
                                x={x}
                                y={y}
                                width="22"
                                height={barH}
                                rx="4"
                                fill="url(#barGrad)"
                                opacity="0.9"
                              />
                              <text
                                x={x + 11}
                                y="148"
                                textAnchor="middle"
                                fill="#94A3B8"
                                fontSize="8.5"
                                className="font-mono-tech"
                              >
                                {w.label}
                              </text>
                            </g>
                          );
                        })}

                        {/* Glowing Trend Line Overlay */}
                        <path
                          d="M 63 82 C 85 72, 95 68, 107 69 C 122 70, 138 76, 151 74 C 168 70, 180 45, 195 34"
                          fill="none"
                          stroke="#34D399"
                          strokeWidth="2.2"
                        />
                        {[
                          { cx: 63, cy: 82 },
                          { cx: 107, cy: 69 },
                          { cx: 151, cy: 74 },
                          { cx: 195, cy: 34 }
                        ].map((c, i) => (
                          <circle
                            key={i}
                            cx={c.cx}
                            cy={c.cy}
                            r="3.5"
                            fill="#FEF08A"
                            stroke="#0EA5E9"
                            strokeWidth="1.5"
                          />
                        ))}
                      </svg>
                    </div>

                    {/* Right Callout: Total Cost ₹ 2,40,000 */}
                    <div className="col-span-5 pl-3 border-l border-slate-800/80 space-y-1.5">
                      <div className="text-xs text-slate-400">Total Cost</div>
                      <div className="font-display font-extrabold text-xl sm:text-2xl text-white font-mono-tech tracking-tight">
                        {COST_TREND_SERIES[costPeriod].totalLabel}
                      </div>
                      <div className="inline-flex items-center gap-1 text-xs font-mono-tech font-semibold text-emerald-400">
                        <span>{COST_TREND_SERIES[costPeriod].delta}</span>
                      </div>
                      <div className="text-[11px] text-slate-400">vs last month</div>
                    </div>
                  </div>
                </div>
              </section>

              {/* ------------------------------------------------------------
                  LINEAR SECTION 3: EQUIPMENT INVENTORY TABLE (CLICK TO INSPECT BESIDE)
                 ------------------------------------------------------------ */}
              <section id="sec-inventory" className="scroll-mt-20 cyber-card rounded-2xl p-5">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-sky-500/15 border border-sky-400/30 text-sky-400">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="font-display font-bold text-base text-white">
                        Equipment Inventory
                      </h2>
                      <p className="text-[11px] text-slate-400">
                        Click any machine row to inspect live telemetry, photo &amp; repair dossier in the{' '}
                        <strong className="text-sky-400">Beside Inspector →</strong>
                      </p>
                    </div>
                  </div>

                  {/* Status Filter Pills + View All */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    {['All', 'Running', 'Maintenance', 'Overdue'].map((st) => (
                      <button
                        key={st}
                        onClick={() => setStatusFilter(st)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                          statusFilter === st
                            ? 'bg-sky-500 text-white shadow-[0_0_12px_rgba(14,165,233,0.5)]'
                            : 'bg-[#0B182C] text-slate-300 hover:bg-sky-500/15 border border-sky-500/20'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                    <button
                      onClick={() => setModalMode('add-equipment')}
                      className="ml-1 inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-sky-500/20 hover:bg-sky-500/30 border border-sky-400/40 text-sky-300 text-xs font-semibold transition-all"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add
                    </button>
                  </div>
                </div>

                {/* Reference-Matched Equipment Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-[#0B192E]/90 border-y border-sky-500/20 text-slate-300 font-display uppercase text-[11px] tracking-wider">
                        <th className="py-3 px-3.5">ID</th>
                        <th className="py-3 px-3.5">Name</th>
                        <th className="py-3 px-3.5">Location</th>
                        <th className="py-3 px-3.5">Status</th>
                        <th className="py-3 px-3.5">Condition</th>
                        <th className="py-3 px-3.5">Next Service</th>
                        <th className="py-3 px-3.5">Technician</th>
                        <th className="py-3 px-3.5 text-right">Inspect</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/70">
                      {filteredEquipment.map((item) => {
                        const isSelected = item.id === selectedMachineId;
                        const statusStyle =
                          item.status === 'Running'
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40'
                            : item.status === 'Maintenance'
                            ? 'bg-amber-500/20 text-amber-300 border-amber-400/40'
                            : 'bg-rose-500/20 text-rose-300 border-rose-400/40';

                        const conditionStyle =
                          item.condition === 'Good'
                            ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                            : item.condition === 'Fair'
                            ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                            : 'bg-rose-500/15 text-rose-300 border-rose-500/30';

                        return (
                          <tr
                            key={item.id}
                            onClick={() => handleSelectMachine(item.id, 'telemetry')}
                            className={`cursor-pointer transition-all ${
                              isSelected
                                ? 'bg-sky-500/15 border-l-4 border-l-sky-400'
                                : 'hover:bg-[#0E213D]/70'
                            }`}
                          >
                            <td className="py-3.5 px-3.5 font-mono-tech font-bold text-sky-400 whitespace-nowrap">
                              {item.id}
                            </td>
                            <td className="py-3.5 px-3.5 font-medium text-white whitespace-nowrap">
                              <div className="flex items-center gap-2.5">
                                <img
                                  src={item.photo}
                                  alt={item.name}
                                  className="w-7 h-7 rounded-md object-cover border border-sky-400/30 shrink-0"
                                />
                                <span>{item.name}</span>
                              </div>
                            </td>
                            <td className="py-3.5 px-3.5 text-slate-300 whitespace-nowrap">
                              {item.location}
                            </td>
                            <td className="py-3.5 px-3.5 whitespace-nowrap">
                              <span
                                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${statusStyle}`}
                              >
                                <span
                                  className={`w-1.5 h-1.5 rounded-full ${
                                    item.status === 'Running'
                                      ? 'bg-emerald-400'
                                      : item.status === 'Maintenance'
                                      ? 'bg-amber-400'
                                      : 'bg-rose-400 animate-ping'
                                  }`}
                                />
                                {item.status}
                              </span>
                            </td>
                            <td className="py-3.5 px-3.5 whitespace-nowrap">
                              <span
                                className={`inline-block px-2.5 py-0.5 rounded-md text-[11px] font-semibold border ${conditionStyle}`}
                              >
                                {item.condition}
                              </span>
                            </td>
                            <td className="py-3.5 px-3.5 font-mono-tech text-slate-200 whitespace-nowrap">
                              {item.nextService}
                            </td>
                            <td className="py-3.5 px-3.5 text-sky-300 underline decoration-sky-500/40 underline-offset-2 whitespace-nowrap">
                              {item.technician}
                            </td>
                            <td className="py-3.5 px-3.5 text-right whitespace-nowrap">
                              <span
                                className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-mono-tech ${
                                  isSelected
                                    ? 'bg-sky-500 text-white font-semibold'
                                    : 'bg-slate-800/80 text-slate-300'
                                }`}
                              >
                                <Eye className="w-3 h-3" /> Beside
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* ------------------------------------------------------------
                  LINEAR SECTION 4: MAINTENANCE CALENDAR + UPCOMING + ACTIVE ALERTS
                 ------------------------------------------------------------ */}
              <section id="sec-schedule" className="scroll-mt-20 grid grid-cols-1 lg:grid-cols-12 gap-5">
                {/* Interactive Maintenance Calendar (April 2025) */}
                <div className="lg:col-span-5 cyber-card rounded-2xl p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-lg bg-sky-500/15 border border-sky-400/30 text-sky-400">
                          <CalendarIcon className="w-4 h-4" />
                        </div>
                        <h2 className="font-display font-bold text-base text-white">
                          Maintenance Calendar
                        </h2>
                      </div>
                    </div>

                    {/* Month Header */}
                    <div className="flex items-center justify-center gap-6 mb-3 py-1.5 rounded-xl bg-[#0B182E] border border-sky-500/20">
                      <button
                        onClick={() => setSelectedCalDay(Math.max(1, selectedCalDay - 1))}
                        className="p-1 hover:text-sky-400 text-slate-400"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <span className="font-display font-bold text-sm text-white">
                        April 2025
                      </span>
                      <button
                        onClick={() => setSelectedCalDay(Math.min(30, selectedCalDay + 1))}
                        className="p-1 hover:text-sky-400 text-slate-400"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Days of Week Header */}
                    <div className="grid grid-cols-7 text-center text-[11px] font-medium text-slate-400 mb-1.5">
                      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                        <div key={d} className="py-1">
                          {d}
                        </div>
                      ))}
                    </div>

                    {/* Calendar Days Grid (April 2025 starts Tuesday, 2 empty slots) */}
                    <div className="grid grid-cols-7 gap-1 text-center font-mono-tech text-xs">
                      {[null, null, ...Array.from({ length: 30 }, (_, i) => i + 1)].map(
                        (day, idx) => {
                          if (!day) {
                            return <div key={`empty-${idx}`} className="h-9" />;
                          }
                          const evs = APRIL_2025_EVENTS[day] || [];
                          const isSelectedDay = selectedCalDay === day;
                          const isToday = day === 28;
                          return (
                            <button
                              key={day}
                              onClick={() => {
                                setSelectedCalDay(day);
                                if (day === 29) handleSelectMachine('EQ-001', 'schedule');
                                if (day === 4 || day === 27) handleSelectMachine('EQ-006', 'schedule');
                              }}
                              className={`relative h-9 rounded-lg flex flex-col items-center justify-center transition-all ${
                                isToday
                                  ? 'bg-sky-500 text-white font-bold shadow-[0_0_15px_rgba(14,165,233,0.75)]'
                                  : isSelectedDay
                                  ? 'bg-sky-500/25 border border-sky-400 text-white font-semibold'
                                  : 'hover:bg-[#112442] text-slate-200'
                              }`}
                            >
                              <span>{day}</span>
                              {evs.length > 0 && (
                                <div className="flex items-center gap-0.5 mt-0.5">
                                  {evs.includes('scheduled') && (
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                  )}
                                  {evs.includes('in-progress') && (
                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                                  )}
                                  {evs.includes('overdue') && (
                                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                                  )}
                                </div>
                              )}
                            </button>
                          );
                        }
                      )}
                    </div>
                  </div>

                  {/* Calendar Legend */}
                  <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-800/80 text-[11px] text-slate-300">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" /> Scheduled
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-400" /> In Progress
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-rose-500" /> Overdue
                    </span>
                  </div>
                </div>

                {/* Upcoming Maintenance + Active Alerts Stack */}
                <div className="lg:col-span-7 space-y-5">
                  {/* Upcoming Maintenance Card */}
                  <div className="cyber-card rounded-2xl p-5">
                    <div className="flex items-center justify-between mb-3.5">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-lg bg-sky-500/15 border border-sky-400/30 text-sky-400">
                          <CalendarIcon className="w-4 h-4" />
                        </div>
                        <h2 className="font-display font-bold text-base text-white">
                          Upcoming Maintenance
                        </h2>
                      </div>
                      <button
                        onClick={() => setModalMode('schedule-pm')}
                        className="text-xs text-sky-400 hover:text-sky-300 font-medium flex items-center gap-1"
                      >
                        <span>+ Schedule PM</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="space-y-2.5">
                      {upcomingList.map((item) => {
                        const isFocused = item.machineId === selectedMachineId;
                        return (
                          <div
                            key={item.id}
                            onClick={() => handleSelectMachine(item.machineId, 'schedule')}
                            className={`p-3 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                              isFocused
                                ? 'bg-sky-500/15 border-sky-400/50'
                                : 'bg-[#0A1629]/90 border-slate-800 hover:border-sky-500/30'
                            }`}
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="w-9 h-9 rounded-full bg-sky-500/15 border border-sky-400/30 flex items-center justify-center text-sky-400 shrink-0">
                                <Wrench className="w-4 h-4" />
                              </div>
                              <div className="min-w-0">
                                <div className="text-xs font-display font-bold text-white truncate">
                                  {item.title}
                                </div>
                                <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                                  <span>{item.taskType}</span>
                                  <span>•</span>
                                  <span className="font-mono-tech text-slate-300">
                                    {item.dueDate}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <span
                              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold shrink-0 border ${
                                item.badge === 'On Track'
                                  ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                                  : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                              }`}
                            >
                              {item.badge}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Active Alerts Panel matching Reference Image */}
                  <div className="cyber-card rounded-2xl p-5 border-rose-500/25">
                    <div className="flex items-center justify-between mb-3.5">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-lg bg-rose-500/20 border border-rose-400/40 text-rose-400">
                          <AlertTriangle className="w-4 h-4" />
                        </div>
                        <h2 className="font-display font-bold text-base text-white">
                          Active Alerts
                        </h2>
                      </div>
                      <span className="text-xs font-mono-tech text-rose-400">
                        {alerts.length} Active
                      </span>
                    </div>

                    <div className="space-y-2.5">
                      {alerts.map((al) => {
                        const iconStyle =
                          al.severity === 'critical'
                            ? 'bg-rose-500/20 border-rose-400/50 text-rose-300'
                            : al.severity === 'warning'
                            ? 'bg-amber-500/20 border-amber-400/50 text-amber-300'
                            : 'bg-sky-500/20 border-sky-400/50 text-sky-300';

                        const msgColor =
                          al.severity === 'critical'
                            ? 'text-rose-400'
                            : al.severity === 'warning'
                            ? 'text-amber-400'
                            : 'text-sky-400';

                        return (
                          <div
                            key={al.id}
                            onClick={() => handleSelectMachine(al.machineId, 'telemetry')}
                            className="p-3 rounded-xl bg-[#0B1528]/90 border border-slate-800 hover:border-rose-500/40 flex items-center justify-between gap-3 cursor-pointer transition-all"
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-9 h-9 rounded-full border flex items-center justify-center shrink-0 ${iconStyle}`}
                              >
                                <AlertTriangle className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="text-xs font-display font-bold text-white">
                                  {al.machineTitle}
                                </div>
                                <div className={`text-[11px] font-medium ${msgColor}`}>
                                  {al.message}
                                </div>
                              </div>
                            </div>
                            <span className="text-[11px] font-mono-tech text-slate-400 shrink-0">
                              {al.timeAgo}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </section>

              {/* ------------------------------------------------------------
                  LINEAR SECTION 5: SERVICE HISTORY LEDGER + DONUT + PROMO + QUICK ACTIONS
                 ------------------------------------------------------------ */}
              <section id="sec-history" className="scroll-mt-20 space-y-5">
                {/* Bottom Reference Row: Smart Maintenance Banner + Maintenance Type Donut + Quick Actions */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                  {/* Smart Maintenance Video/Interactive Banner */}
                  <div className="lg:col-span-5 relative rounded-2xl overflow-hidden border border-sky-500/30 min-h-[190px] flex items-center p-5 group">
                    <img
                      src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80"
                      alt="Smart Maintenance Engineer"
                      className="absolute inset-0 w-full h-full object-cover brightness-40 group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#061124]/95 via-[#061124]/75 to-transparent" />

                    <div className="relative z-10 flex items-center gap-4">
                      <button
                        onClick={() =>
                          triggerToast('Smart Predictive Telemetry Diagnostics Running: All Sensors Online')
                        }
                        className="w-12 h-12 rounded-full bg-sky-500/30 hover:bg-sky-500 border-2 border-sky-300 flex items-center justify-center text-white shadow-[0_0_25px_rgba(14,165,233,0.8)] transition-all shrink-0"
                      >
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </button>
                      <div>
                        <h3 className="font-display font-extrabold text-base sm:text-lg text-white leading-snug">
                          Smart Maintenance for Maximum Performance
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-sky-300 font-medium mt-2">
                          <span>Monitor</span>
                          <span className="text-emerald-400">•</span>
                          <span>Maintain</span>
                          <span className="text-emerald-400">•</span>
                          <span>Maximize</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Maintenance Type Donut Chart (Total 15: Preventive 10, Corrective 3, Inspection 2) */}
                  <div className="lg:col-span-4 cyber-card rounded-2xl p-5 flex flex-col justify-between">
                    <h3 className="font-display font-bold text-sm text-white mb-2">
                      Maintenance Type
                    </h3>
                    <div className="flex items-center gap-4 my-auto">
                      <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
                        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                          {/* Preventive 67% (Green) */}
                          <circle
                            cx="50"
                            cy="50"
                            r="38"
                            fill="transparent"
                            stroke="#10B981"
                            strokeWidth="12"
                            strokeDasharray="160 239"
                            strokeDashoffset="0"
                          />
                          {/* Corrective 20% (Amber) */}
                          <circle
                            cx="50"
                            cy="50"
                            r="38"
                            fill="transparent"
                            stroke="#F59E0B"
                            strokeWidth="12"
                            strokeDasharray="48 239"
                            strokeDashoffset="-160"
                          />
                          {/* Inspection 13% (Blue) */}
                          <circle
                            cx="50"
                            cy="50"
                            r="38"
                            fill="transparent"
                            stroke="#0EA5E9"
                            strokeWidth="12"
                            strokeDasharray="31 239"
                            strokeDashoffset="-208"
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                          <span className="text-[10px] text-slate-400">Total</span>
                          <span className="font-display font-extrabold text-lg text-white font-mono-tech">
                            {10 + historyList.length}
                          </span>
                        </div>
                      </div>

                      <div className="flex-1 space-y-2 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1.5 text-slate-300">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                            Preventive
                          </span>
                          <span className="font-mono-tech text-white font-semibold">
                            10 <span className="text-slate-400 font-normal">(67%)</span>
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1.5 text-slate-300">
                            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                            Corrective
                          </span>
                          <span className="font-mono-tech text-white font-semibold">
                            3 <span className="text-slate-400 font-normal">(20%)</span>
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1.5 text-slate-300">
                            <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
                            Inspection
                          </span>
                          <span className="font-mono-tech text-white font-semibold">
                            2 <span className="text-slate-400 font-normal">(13%)</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions 2x2 Neon Grid */}
                  <div className="lg:col-span-3 cyber-card rounded-2xl p-4 flex flex-col justify-between">
                    <h3 className="font-display font-bold text-sm text-white mb-2.5">
                      Quick Actions
                    </h3>
                    <div className="grid grid-cols-2 gap-2.5 my-auto">
                      <button
                        onClick={() => setModalMode('add-equipment')}
                        className="p-2.5 rounded-xl bg-gradient-to-br from-sky-500/25 to-blue-600/15 hover:from-sky-500/35 border border-sky-400/40 flex flex-col items-start gap-1.5 text-left transition-all"
                      >
                        <div className="p-1.5 rounded-lg bg-sky-500 text-white">
                          <Plus className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-[11px] font-display font-bold text-white leading-tight">
                          Add Equipment
                        </span>
                      </button>

                      <button
                        onClick={() => setModalMode('create-wo')}
                        className="p-2.5 rounded-xl bg-gradient-to-br from-emerald-500/25 to-teal-600/15 hover:from-emerald-500/35 border border-emerald-400/40 flex flex-col items-start gap-1.5 text-left transition-all"
                      >
                        <div className="p-1.5 rounded-lg bg-emerald-500 text-white">
                          <Wrench className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-[11px] font-display font-bold text-white leading-tight">
                          Create Work Order
                        </span>
                      </button>

                      <button
                        onClick={handleExportCSV}
                        className="p-2.5 rounded-xl bg-gradient-to-br from-violet-500/25 to-purple-600/15 hover:from-violet-500/35 border border-violet-400/40 flex flex-col items-start gap-1.5 text-left transition-all"
                      >
                        <div className="p-1.5 rounded-lg bg-violet-500 text-white">
                          <BarChart3 className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-[11px] font-display font-bold text-white leading-tight">
                          Export Reports
                        </span>
                      </button>

                      <button
                        onClick={() => setModalMode('create-wo')}
                        className="p-2.5 rounded-xl bg-gradient-to-br from-amber-500/25 to-orange-600/15 hover:from-amber-500/35 border border-amber-400/40 flex flex-col items-start gap-1.5 text-left transition-all"
                      >
                        <div className="p-1.5 rounded-lg bg-amber-500 text-white">
                          <CalendarIcon className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-[11px] font-display font-bold text-white leading-tight">
                          Schedule Maint.
                        </span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Full Repair & Service History Ledger Table */}
                <div className="cyber-card rounded-2xl p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 rounded-lg bg-sky-500/15 border border-sky-400/30 text-sky-400">
                        <History className="w-4 h-4" />
                      </div>
                      <div>
                        <h2 className="font-display font-bold text-base text-white">
                          Complete Repair History &amp; Work Order Ledger
                        </h2>
                        <p className="text-[11px] text-slate-400">
                          Historical log of preventive services, emergency repairs, replaced parts, and ₹ INR expenditure
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setModalMode('create-wo')}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold transition-all"
                      >
                        <Plus className="w-3.5 h-3.5" /> Log Repair / Work Order
                      </button>
                      <button
                        onClick={handleExportCSV}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0D1E36] hover:bg-sky-500/20 border border-sky-500/30 text-sky-300 text-xs font-semibold transition-all"
                      >
                        <Download className="w-3.5 h-3.5" /> CSV
                      </button>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-[#0B192E]/90 border-y border-sky-500/20 text-slate-300 font-display uppercase text-[11px] tracking-wider">
                          <th className="py-3 px-3.5">Work Order / Date</th>
                          <th className="py-3 px-3.5">Machine</th>
                          <th className="py-3 px-3.5">Type</th>
                          <th className="py-3 px-3.5">Repair Summary &amp; Parts</th>
                          <th className="py-3 px-3.5">Technician</th>
                          <th className="py-3 px-3.5 text-right">Cost (₹)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/70">
                        {filteredHistory.map((h) => (
                          <tr
                            key={h.woId}
                            onClick={() => handleSelectMachine(h.machineId, 'history')}
                            className="hover:bg-[#0E213D]/70 cursor-pointer transition-colors"
                          >
                            <td className="py-3 px-3.5 whitespace-nowrap">
                              <div className="font-mono-tech font-bold text-sky-400">{h.woId}</div>
                              <div className="font-mono-tech text-[11px] text-slate-400">
                                {h.date}
                              </div>
                            </td>
                            <td className="py-3 px-3.5 font-semibold text-white whitespace-nowrap">
                              {h.machineName}
                            </td>
                            <td className="py-3 px-3.5 whitespace-nowrap">
                              <span
                                className={`px-2 py-0.5 rounded-md text-[11px] font-semibold border ${
                                  h.type === 'Preventive'
                                    ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                                    : h.type === 'Corrective'
                                    ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                                    : 'bg-sky-500/15 text-sky-300 border-sky-500/30'
                                }`}
                              >
                                {h.type}
                              </span>
                            </td>
                            <td className="py-3 px-3.5 max-w-md">
                              <div className="text-slate-100 font-medium">{h.summary}</div>
                              <div className="text-[11px] text-slate-400 mt-0.5">
                                Parts: {h.partsUsed} • Downtime: {h.downtimeHrs}h
                              </div>
                            </td>
                            <td className="py-3 px-3.5 text-sky-300 whitespace-nowrap">
                              {h.technician}
                            </td>
                            <td className="py-3 px-3.5 text-right font-mono-tech font-bold text-emerald-300 whitespace-nowrap">
                              ₹ {h.costInr.toLocaleString('en-IN')}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>
            </div>

            {/* ==============================================================
                RIGHT 4 COLUMNS: PERSISTENT "BESIDE" DETAIL & INFORMATION INSPECTOR
               ============================================================== */}
            <aside className="xl:col-span-4 xl:sticky xl:top-20 space-y-5">
              <div className="cyber-card rounded-2xl overflow-hidden border-sky-400/35 shadow-[0_15px_50px_rgba(2,132,199,0.22)]">
                {/* Beside Header Bar */}
                <div className="px-4 py-3 bg-gradient-to-r from-sky-500/20 via-[#0E2240] to-[#09172B] border-b border-sky-500/25 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-sky-400" />
                    <span className="font-display font-bold text-xs uppercase tracking-wider text-sky-300">
                      Beside Equipment Detail &amp; Telemetry
                    </span>
                  </div>
                  <span className="font-mono-tech text-xs font-bold px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-400/30">
                    {selectedMachine.id}
                  </span>
                </div>

                {/* High-Res Machine Photo Banner with Overlay Status */}
                <div className="relative h-44 w-full bg-[#050C18] overflow-hidden border-b border-slate-800">
                  <img
                    src={selectedMachine.photo}
                    alt={selectedMachine.name}
                    className="w-full h-full object-cover object-center brightness-90 transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071122] via-[#071122]/35 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-[#060D1A]/90 backdrop-blur-md text-sky-300 font-mono-tech text-xs font-bold border border-sky-400/40">
                      {selectedMachine.code}
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-[#060D1A]/90 backdrop-blur-md text-slate-200 text-xs font-medium border border-slate-700 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-sky-400" /> {selectedMachine.location}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-md ${
                        selectedMachine.status === 'Running'
                          ? 'bg-emerald-950/90 text-emerald-300 border-emerald-400/60'
                          : selectedMachine.status === 'Maintenance'
                          ? 'bg-amber-950/90 text-amber-300 border-amber-400/60'
                          : 'bg-rose-950/90 text-rose-300 border-rose-400/60'
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          selectedMachine.status === 'Running'
                            ? 'bg-emerald-400'
                            : selectedMachine.status === 'Maintenance'
                            ? 'bg-amber-400'
                            : 'bg-rose-400 animate-ping'
                        }`}
                      />
                      {selectedMachine.status}
                    </span>
                  </div>

                  {/* Bottom Title Overlay */}
                  <div className="absolute bottom-3 left-4 right-4">
                    <h3 className="font-display font-extrabold text-lg text-white leading-tight">
                      {selectedMachine.name}
                    </h3>
                    <p className="text-xs text-slate-300 truncate">{selectedMachine.fullModel}</p>
                  </div>
                </div>

                {/* Machine Selector Quick Pills inside Beside Inspector */}
                <div className="px-4 py-2.5 bg-[#071224] border-b border-slate-800/80 flex items-center gap-1.5 overflow-x-auto">
                  {equipment.map((eq) => (
                    <button
                      key={eq.id}
                      onClick={() => setSelectedMachineId(eq.id)}
                      className={`px-2.5 py-1 rounded-md font-mono-tech text-[11px] font-semibold transition-all shrink-0 ${
                        eq.id === selectedMachine.id
                          ? 'bg-sky-500 text-white shadow-[0_0_10px_rgba(14,165,233,0.6)]'
                          : 'bg-[#0D1E38] text-slate-400 hover:text-white'
                      }`}
                    >
                      {eq.id}
                    </button>
                  ))}
                </div>

                {/* Beside Inspector Sub-Tabs */}
                <div className="grid grid-cols-3 border-b border-slate-800 bg-[#091529] text-xs font-display font-semibold">
                  {[
                    { key: 'telemetry', label: 'Live Telemetry' },
                    { key: 'schedule', label: 'PM & Specs' },
                    { key: 'history', label: 'Repair Log' }
                  ].map((t) => (
                    <button
                      key={t.key}
                      onClick={() => setBesideTab(t.key)}
                      className={`py-2.5 text-center border-b-2 transition-all ${
                        besideTab === t.key
                          ? 'border-sky-400 text-sky-300 bg-sky-500/10'
                          : 'border-transparent text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>

                {/* Beside Body Content */}
                <div className="p-4 space-y-4">
                  {besideTab === 'telemetry' && (
                    <>
                      {/* 4 Real-Time Sensor Telemetry Cards */}
                      <div className="grid grid-cols-2 gap-2.5">
                        <div className="p-3 rounded-xl bg-[#09162B] border border-sky-500/20">
                          <div className="flex items-center justify-between text-[11px] text-slate-400">
                            <span>Temperature</span>
                            <Thermometer
                              className={`w-3.5 h-3.5 ${
                                selectedMachine.temperatureC > 65
                                  ? 'text-rose-400'
                                  : 'text-emerald-400'
                              }`}
                            />
                          </div>
                          <div className="font-mono-tech font-bold text-base text-white mt-1">
                            {selectedMachine.temperatureC}°C
                          </div>
                          <div className="text-[10px] text-slate-400 mt-0.5">
                            Nominal &lt; 65°C
                          </div>
                        </div>

                        <div className="p-3 rounded-xl bg-[#09162B] border border-sky-500/20">
                          <div className="flex items-center justify-between text-[11px] text-slate-400">
                            <span>Vibration RMS</span>
                            <Activity className="w-3.5 h-3.5 text-sky-400" />
                          </div>
                          <div className="font-mono-tech font-bold text-base text-white mt-1">
                            {selectedMachine.vibrationMmS} mm/s
                          </div>
                          <div className="text-[10px] text-slate-400 mt-0.5">
                            ISO 10816 Class II
                          </div>
                        </div>

                        <div className="p-3 rounded-xl bg-[#09162B] border border-sky-500/20">
                          <div className="flex items-center justify-between text-[11px] text-slate-400">
                            <span>Runtime Meter</span>
                            <Gauge className="w-3.5 h-3.5 text-amber-400" />
                          </div>
                          <div className="font-mono-tech font-bold text-base text-white mt-1">
                            {selectedMachine.runtimeHours.toLocaleString()} h
                          </div>
                          <div className="text-[10px] text-sky-300 mt-0.5">
                            PM @ {selectedMachine.serviceIntervalHours} h
                          </div>
                        </div>

                        <div className="p-3 rounded-xl bg-[#09162B] border border-sky-500/20">
                          <div className="flex items-center justify-between text-[11px] text-slate-400">
                            <span>Power / Load</span>
                            <Zap className="w-3.5 h-3.5 text-cyan-400" />
                          </div>
                          <div className="font-mono-tech font-bold text-base text-white mt-1">
                            {selectedMachine.powerKw} kW
                          </div>
                          <div className="text-[10px] text-slate-400 truncate mt-0.5">
                            {selectedMachine.spindleRpm}
                          </div>
                        </div>
                      </div>

                      {/* Runtime Progress Bar toward Next Service */}
                      <div className="p-3.5 rounded-xl bg-[#09162B] border border-sky-500/20 space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-300 font-medium">
                            Service Interval Cycle
                          </span>
                          <span className="font-mono-tech font-bold text-sky-300">
                            {Math.min(
                              100,
                              Math.round(
                                (selectedMachine.runtimeHours /
                                  selectedMachine.serviceIntervalHours) *
                                  100
                              )
                            )}
                            %
                          </span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              selectedMachine.status === 'Overdue'
                                ? 'bg-rose-500'
                                : selectedMachine.status === 'Maintenance'
                                ? 'bg-amber-400'
                                : 'bg-gradient-to-r from-sky-400 to-emerald-400'
                            }`}
                            style={{
                              width: `${Math.min(
                                100,
                                Math.round(
                                  (selectedMachine.runtimeHours /
                                    selectedMachine.serviceIntervalHours) *
                                    100
                                )
                              )}%`
                            }}
                          />
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono-tech">
                          <span>Last: {selectedMachine.lastServiceDate}</span>
                          <span className="text-sky-300">
                            Next: {selectedMachine.nextService}
                          </span>
                        </div>
                      </div>

                      {/* Assigned Technician Card */}
                      <div className="p-3.5 rounded-xl bg-[#09162B] border border-sky-500/20 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-sky-500/20 border border-sky-400/40 flex items-center justify-center font-display font-bold text-sky-300 text-xs">
                            {selectedMachine.technician
                              .split(' ')
                              .map((n) => n[0])
                              .join('')}
                          </div>
                          <div>
                            <div className="text-xs font-display font-bold text-white">
                              {selectedMachine.technician}
                            </div>
                            <div className="text-[11px] text-slate-400">
                              {selectedMachine.techRole}
                            </div>
                            <div className="text-[10px] font-mono-tech text-sky-400 mt-0.5">
                              {selectedMachine.techPhone}
                            </div>
                          </div>
                        </div>
                        <span className="px-2.5 py-1 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[11px] font-semibold">
                          On Shift
                        </span>
                      </div>

                      {/* Diagnostic Advisory Note */}
                      <div className="p-3.5 rounded-xl bg-[#09162B]/90 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                        <strong className="text-white block mb-1 font-display">
                          Engineering &amp; Condition Notes:
                        </strong>
                        {selectedMachine.notes}
                      </div>
                    </>
                  )}

                  {besideTab === 'schedule' && (
                    <div className="space-y-3">
                      <div className="p-3.5 rounded-xl bg-[#09162B] border border-sky-500/20 space-y-2">
                        <div className="text-xs font-display font-bold text-white">
                          Nameplate &amp; Technical Specifications
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                          {Object.entries(selectedMachine.specs || {}).map(([k, v]) => (
                            <div
                              key={k}
                              className="p-2 rounded-lg bg-[#060E1C] border border-slate-800/80"
                            >
                              <div className="text-[10px] uppercase text-slate-400">{k}</div>
                              <div className="font-mono-tech text-slate-200 font-semibold mt-0.5 truncate">
                                {v}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="p-3.5 rounded-xl bg-[#09162B] border border-sky-500/20 space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-display font-bold text-white">
                            Scheduled PM Tasks
                          </span>
                          <span className="font-mono-tech text-[11px] text-sky-400">
                            Next: {selectedMachine.nextService}
                          </span>
                        </div>
                        {upcomingList
                          .filter((u) => u.machineId === selectedMachine.id)
                          .map((u) => (
                            <div
                              key={u.id}
                              className="p-2.5 rounded-lg bg-[#060E1C] border border-sky-500/25 space-y-1 text-xs"
                            >
                              <div className="flex items-center justify-between font-semibold text-white">
                                <span>{u.taskType}</span>
                                <span className="font-mono-tech text-emerald-400">
                                  ₹ {u.estCostInr.toLocaleString('en-IN')}
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-400">{u.checklist}</p>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                  {besideTab === 'history' && (
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400">Cumulative Repair Spend:</span>
                        <span className="font-mono-tech font-bold text-emerald-400">
                          ₹ {selectedMachine.totalRepairCostInr.toLocaleString('en-IN')}
                        </span>
                      </div>
                      {historyList.filter((h) => h.machineId === selectedMachine.id).length ===
                      0 ? (
                        <div className="p-4 rounded-xl bg-[#09162B] text-center text-xs text-slate-400">
                          No prior repair tickets logged for this unit.
                        </div>
                      ) : (
                        historyList
                          .filter((h) => h.machineId === selectedMachine.id)
                          .map((h) => (
                            <div
                              key={h.woId}
                              className="p-3 rounded-xl bg-[#09162B] border border-slate-800 space-y-1 text-xs"
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-mono-tech font-bold text-sky-400">
                                  {h.woId} • {h.date}
                                </span>
                                <span className="font-mono-tech font-bold text-emerald-300">
                                  ₹ {h.costInr.toLocaleString('en-IN')}
                                </span>
                              </div>
                              <div className="text-white font-medium">{h.summary}</div>
                              <div className="text-[11px] text-slate-400">
                                Tech: {h.technician} • Parts: {h.partsUsed}
                              </div>
                            </div>
                          ))
                      )}
                    </div>
                  )}

                  {/* Beside Action Footer Buttons */}
                  <div className="pt-2 border-t border-slate-800 grid grid-cols-3 gap-2">
                    <button
                      onClick={() => handleLogShiftHours(selectedMachine.id)}
                      className="py-2 px-2.5 rounded-xl bg-[#0C1D36] hover:bg-sky-500/20 border border-sky-500/30 text-sky-300 font-mono-tech text-xs font-semibold transition-all"
                    >
                      +8h Shift
                    </button>
                    <button
                      onClick={() => handleCompleteService(selectedMachine.id)}
                      className="py-2 px-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center justify-center gap-1 transition-all shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                    >
                      <Check className="w-3.5 h-3.5" /> Complete PM
                    </button>
                    <button
                      onClick={() => {
                        setNewWoForm((prev) => ({ ...prev, machineId: selectedMachine.id }));
                        setModalMode('create-wo');
                      }}
                      className="py-2 px-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold flex items-center justify-center gap-1 transition-all"
                    >
                      <Wrench className="w-3.5 h-3.5" /> Log Repair
                    </button>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>

      {/* ====================================================================
          MODAL 1: ADD EQUIPMENT TO WORKSHOP INVENTORY
         ==================================================================== */}
      {modalMode === 'add-equipment' && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="cyber-card rounded-2xl max-w-md w-full p-5 border border-sky-400/40 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-display font-bold text-base text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-sky-400" /> Add New Workshop Equipment
              </h3>
              <button onClick={() => setModalMode(null)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddEquipmentSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Equipment Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Fiber Laser Cutter"
                  value={newEqForm.name}
                  onChange={(e) => setNewEqForm({ ...newEqForm, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#091528] border border-sky-500/30 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Full Make &amp; Model</label>
                <input
                  type="text"
                  placeholder="e.g., Amada Ventis 4kW Fiber Laser"
                  value={newEqForm.fullModel}
                  onChange={(e) => setNewEqForm({ ...newEqForm, fullModel: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#091528] border border-sky-500/30 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Workshop Location</label>
                  <select
                    value={newEqForm.location}
                    onChange={(e) => setNewEqForm({ ...newEqForm, location: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#091528] border border-sky-500/30 text-white"
                  >
                    <option value="Bay 1">Bay 1</option>
                    <option value="Bay 2">Bay 2</option>
                    <option value="Bay 3">Bay 3</option>
                    <option value="Bay 4">Bay 4</option>
                    <option value="Utility">Utility</option>
                    <option value="Yard">Yard</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Initial Status</label>
                  <select
                    value={newEqForm.status}
                    onChange={(e) => setNewEqForm({ ...newEqForm, status: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#091528] border border-sky-500/30 text-white"
                  >
                    <option value="Running">Running</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Overdue">Overdue</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Next Service Date</label>
                  <input
                    type="text"
                    value={newEqForm.nextService}
                    onChange={(e) => setNewEqForm({ ...newEqForm, nextService: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#091528] border border-sky-500/30 text-white font-mono-tech"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Assigned Technician</label>
                  <input
                    type="text"
                    value={newEqForm.technician}
                    onChange={(e) => setNewEqForm({ ...newEqForm, technician: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#091528] border border-sky-500/30 text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setModalMode(null)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-white font-semibold shadow-[0_0_15px_rgba(14,165,233,0.5)]"
                >
                  Save Equipment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ====================================================================
          MODAL 2: CREATE WORK ORDER / LOG REPAIR
         ==================================================================== */}
      {(modalMode === 'create-wo' || modalMode === 'schedule-pm') && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="cyber-card rounded-2xl max-w-md w-full p-5 border border-emerald-400/40 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-display font-bold text-base text-white flex items-center gap-2">
                <Wrench className="w-4 h-4 text-emerald-400" /> Log Maintenance Work Order
              </h3>
              <button onClick={() => setModalMode(null)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateWorkOrderSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Select Machine *</label>
                <select
                  value={newWoForm.machineId}
                  onChange={(e) => setNewWoForm({ ...newWoForm, machineId: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#091528] border border-sky-500/30 text-white"
                >
                  {equipment.map((eq) => (
                    <option key={eq.id} value={eq.id}>
                      {eq.id} — {eq.name} ({eq.location})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Work Performed / Service Summary *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Spindle lubrication & hydraulic chuck pressure test"
                  value={newWoForm.summary}
                  onChange={(e) => setNewWoForm({ ...newWoForm, summary: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#091528] border border-sky-500/30 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Maintenance Type</label>
                  <select
                    value={newWoForm.type}
                    onChange={(e) => setNewWoForm({ ...newWoForm, type: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#091528] border border-sky-500/30 text-white"
                  >
                    <option value="Preventive">Preventive</option>
                    <option value="Corrective">Corrective</option>
                    <option value="Inspection">Inspection</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Cost (₹ INR)</label>
                  <input
                    type="number"
                    value={newWoForm.costInr}
                    onChange={(e) => setNewWoForm({ ...newWoForm, costInr: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#091528] border border-sky-500/30 text-white font-mono-tech"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Parts Replaced</label>
                  <input
                    type="text"
                    placeholder="OEM Filter / Seal Kit"
                    value={newWoForm.partsUsed}
                    onChange={(e) => setNewWoForm({ ...newWoForm, partsUsed: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#091528] border border-sky-500/30 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Technician</label>
                  <input
                    type="text"
                    value={newWoForm.technician}
                    onChange={(e) => setNewWoForm({ ...newWoForm, technician: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#091528] border border-sky-500/30 text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setModalMode(null)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white font-semibold shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                >
                  Log Work Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ====================================================================
          LIVE TOAST NOTIFICATION
         ==================================================================== */}
      {toastMsg && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-[#0B192E]/95 border border-sky-400/50 text-white text-xs font-semibold shadow-[0_0_25px_rgba(14,165,233,0.4)] backdrop-blur-md">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}
    </div>
  );
}