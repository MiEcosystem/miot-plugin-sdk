export default function useHardwareVersion(device?: import("miot/device/BasicDevice").BasicDevice): {
    sdk: string;
    mcu: string;
};