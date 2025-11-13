// --- DATA ---
const symptoms = [
    {
        id: "symptom-gibberish",
        title: "Symptom: Gibberish or Garbled Console Output",
        steps: [
            { id: "gibberish-1", do: "Identify the Symptom", how: { generic: "You see random characters like `▒▒▒`." }, means: [{ cue: "🔴 (Critical)", text: "This is a classic baud rate mismatch." }] },
            { id: "gibberish-2", do: "Change the Baud Rate", how: { generic: "In your terminal, change 'Speed (baud)' to <b>9600</b>, then <b>115200</b>." }, means: [{ cue: " ", text: "Cycle through rates in Appendix B." }] },
            { id: "gibberish-3", do: "Verify Other Serial Settings", how: { generic: "Confirm: Data bits: 8, Stop bits: 1, Parity: None." }, means: [{ cue: " ", text: "Incorrect settings can also cause issues." }] }
        ]
    },
    {
        id: "symptom-single-user",
        title: "Symptom: No Connectivity (Single User/Device)",
        steps: [
            { id: "single-1", do: "Check Physical Layer", how: { generic: "Visually inspect cable and link lights." }, means: [{ cue: "🟢 (OK)", text: "<b>Solid Green Light:</b> Link is up." }, { cue: "🔴 (Critical)", text: "<b>No Light/Amber Light:</b> Link is down. <b>Next Step:</b> Try a different port and a known-good cable." }] },
            { id: "single-2", do: "Verify Port Status", how: { cisco_ios: "<code>show interfaces status | include [port]</code>", juniper_junos: "<code>show interfaces [port] terse</code>", arista_eos: "<code>show interface status</code>" }, means: [{ cue: "🟢 (OK)", text: "<b>Status 'connected':</b> Port is active." }, { cue: "🟡 (Investigate)", text: "<b>Status 'err-disabled':</b> Port was shut down by a security feature. <b>Next Step:</b> Investigate the cause using `show port-security`." }] },
            { id: "single-3", do: "Check VLAN Assignment", how: { cisco_ios: "<code>show vlan brief | include [port]</code>", juniper_junos: "<code>show vlans | match [port]</code>", arista_eos: "<code>show vlan | include [port]</code>" }, means: [{ cue: "🟢 (OK)", text: "Port is in the correct VLAN." }, { cue: "🔴 (Critical)", text: "Port is in the wrong VLAN. <b>Next Step:</b> Move the port to the correct VLAN." }] },
        ]
    },
    {
        id: "symptom-subnet",
        title: "Symptom: No Connectivity (Entire Subnet/VLAN)",
        steps: [
            { id: "subnet-1", do: "Check the Gateway/SVI", how: { cisco_ios: "<code>show ip interface brief</code>", juniper_junos: "<code>show interfaces terse | match vlan</code>", arista_eos: "<code>show ip interface brief</code>" }, means: [{ cue: "🟢 (OK)", text: "<b>Interface is 'up/up':</b> Gateway is active." }, { cue: "🟡 (Investigate)", text: "<b>Interface is 'down' or 'admin down':</b> The VLAN interface is disabled or has no active ports in it." }] },
            { id: "subnet-2", do: "Verify Uplink/Trunk Status", how: { cisco_ios: "<code>show interface trunk</code>", juniper_junos: "<code>show interfaces trunk</code>", arista_eos: "<code>show interfaces trunk</code>" }, means: [{ cue: "🟢 (OK)", text: "Trunk is up and the VLAN is allowed." }, { cue: "🔴 (Critical)", text: "VLAN is not in the 'allowed' list. <b>Next Step:</b> Add the VLAN to the trunk's allowed list on both ends." }] },
            { id: "subnet-3", do: "Check Spanning Tree (STP)", how: { cisco_ios: "<code>show spanning-tree vlan [id]</code>", juniper_junos: "<code>show spanning-tree bridge</code>", arista_eos: "<code>show spanning-tree vlan [id]</code>" }, means: [{ cue: "🟢 (OK)", text: "Port is 'Forwarding' (FWD)." }, { cue: "🔴 (Critical)", text: "Port is 'Blocking' (BLK). <b>Next Step:</b> This is a critical issue. Investigate your network topology for loops." }] },
        ]
    },
    {
        id: "symptom-performance",
        title: "Symptom: Intermittent Connectivity / Slow Performance",
        steps: [
            { id: "perf-1", do: "Check for Interface Errors", how: { cisco_ios: "<code>show interface [name]</code>", juniper_junos: "<code>show interfaces [name] detail</code>", arista_eos: "<code>show interfaces [name]</code>" }, means: [{ cue: "🟢 (OK)", text: "Error counters are zero or low." }, { cue: "🔴 (Critical)", text: "Counters are high/increasing. <b>Next Step:</b> Replace the cable first. If that fails, check for a duplex mismatch." }] },
            { id: "perf-2", do: "Verify Duplex Settings", how: { cisco_ios: "<code>show interface [name] | include duplex</code>", juniper_junos: "<code>show interfaces [name] | match Duplex</code>", arista_eos: "<code>show interfaces [name] | include Duplex</code>" }, means: [{ cue: "🟢 (OK)", text: "Duplex is 'full' and matches." }, { cue: "🔴 (Critical)", text: "Duplex is 'half' or mismatched. <b>Next Step:</b> Set both ends to `auto` or hard-code them to `full`." }] },
            { id: "perf-3", do: "Monitor CPU Utilization", how: { cisco_ios: "<code>show processes cpu sorted</code>", juniper_junos: "<code>show system processes extensive</code>", arista_eos: "<code>show processes top</code>" }, means: [{ cue: "🟢 (OK)", text: "CPU is below 70%." }, { cue: "🟡 (Investigate)", text: "CPU is consistently high (>80%). <b>Next Step:</b> Identify the top process to find the cause (e.g., broadcast storm)." }] }
        ]
    },
    {
        id: "symptom-poe",
        title: "Symptom: PoE Device Not Powering On",
        steps: [
            { id: "poe-1", do: "Verify PoE Status on Port", how: { cisco_ios: "<code>show power inline [interface]</code>", juniper_junos: "<code>show poe interface [interface]</code>", arista_eos: "<code>show poe interface [interface]</code>" }, means: [{ cue: "🟢 (OK)", text: "<b>Status 'delivering power':</b> Issue is likely cable or device." }, { cue: "🟡 (Investigate)", text: "<b>Status 'denied' or 'faulty':</b> Switch is not providing power. Continue." }] },
            { id: "poe-2", do: "Check PoE Budget", how: { cisco_ios: "<code>show power inline</code>", juniper_junos: "<code>show poe controller</code>", arista_eos: "<code>show poe</code>" }, means: [{ cue: "🟢 (OK)", text: "Available power is sufficient." }, { cue: "🔴 (Critical)", text: "Available power is near zero. No more power to allocate." }] },
            { id: "poe-3", do: "Test with Known-Good Items", how: { generic: "Swap port, cable, and device one by one." }, means: [{ cue: " ", text: "This is the fastest way to isolate the fault to a specific component." }] }
        ]
    },
    {
        id: "symptom-unresponsive",
        title: "Symptom: Switch is Unresponsive (No Console/SSH)",
        steps: [
            { id: "unresp-1", do: "Verify Physical Access", how: { generic: "Check console cable is secure. Test adapter." }, means: [{ cue: " ", text: "Confirms your access equipment is working." }] },
            { id: "unresp-2", do: "Perform a Power Cycle", how: { generic: "Disconnect power, wait 30s, reconnect." }, means: [{ cue: "🟡 (Investigate)", text: "<b>Warning:</b> This causes an outage for connected devices." }] },
            { id: "unresp-3", do: "Observe Boot Sequence", how: { generic: "Watch console output during power cycle." }, means: [{ cue: "🟢 (OK)", text: "You see boot messages. Look for errors." }, { cue: "🔴 (Critical)", text: "Still no output. Likely a hardware failure." }] }
        ]
    }
];

const baudRates = [
    { rate: '9600', use: '<b>Default console rate. START HERE. (Common for Cisco)</b>' }, 
    { rate: '115200', use: '<b>Modern console high speed. TRY THIS SECOND. (Common for Juniper, Arista)</b>' }, 
    { rate: '19200', use: 'Faster console' }, 
    { rate: '38400', use: 'Fast console or modem' }, 
    { rate: '57600', use: 'High speed serial' }, 
    { rate: '4800', use: 'Older terminals' }, 
    { rate: '2400', use: 'Legacy serial' }, 
    { rate: '1200', use: 'Early serial comms' }
]; 

const regexes = [
    { goal: "Find a MAC Address", pattern: "<code>([0-9a-fA-F]{4}\\.){2}[0-9a-fA-F]{4}</code>", example: "<code>show mac address-table | include ([0-9a-fA-F]{4}\\.){2}[0-9a-fA-F]{4}</code>" },
    { goal: "Find an IP Address", pattern: "<code>([0-9]{1,3}\\.){3}[0-9a-1,3}</code>", example: "<code>show ip arp | include ([0-9]{1,3}\\.){3}[0-9]{1,3}</code>" },
    { goal: "Filter for 'up/up' Interfaces", pattern: "<code>up\\s+up</code>", example: "<code>show ip interface brief | include up\\s+up</code>" },
    { goal: "Filter for 'err-disabled'", pattern: "<code>err-disabled</code>", example: "<code>show interface status | include err-disabled</code>" }
];

// --- XLSX File Handling Globals (from original file) ---
var gk_isXlsx = false;
var gk_xlsxFileLookup = {};
var gk_fileData = {};
