export function resetClassVariables(): void;
declare function Settings({ navigation, options, firstOptions, secondOptions, showDot, extraOptions, firstCustomOptions, secondCustomOptions, children }: {
    navigation: any;
    options: any;
    firstOptions: any;
    secondOptions: any;
    showDot: any;
    extraOptions: any;
    firstCustomOptions: any;
    secondCustomOptions: any;
    children: any;
}): JSX.Element;
declare namespace Settings {
    namespace propTypes {
        const navigation: PropTypes.Requireable<object>;
        const options: PropTypes.Requireable<(string | null | undefined)[]>;
        const firstOptions: PropTypes.Requireable<(string | null | undefined)[]>;
        const secondOptions: PropTypes.Requireable<(string | null | undefined)[]>;
        const showDot: any;
        const extraOptions: PropTypes.Requireable<PropTypes.InferProps<{
            excludeRequiredOptions: any;
            preOperations: PropTypes.Requireable<object>;
            showUpgrade: PropTypes.Requireable<boolean>;
            upgradePageKey: PropTypes.Requireable<string>;
            bleOtaAuthType: PropTypes.Requireable<number>;
            networkInfoConfig: PropTypes.Requireable<object>;
            syncDevice: PropTypes.Requireable<boolean>;
            deleteDeviceMessage: PropTypes.Requireable<string>;
            licenseUrl: PropTypes.Requireable<any>;
            policyUrl: PropTypes.Requireable<any>;
            option: PropTypes.Requireable<PropTypes.InferProps<{
                privacyURL: PropTypes.Requireable<any>;
                agreementURL: PropTypes.Requireable<any>;
                hideAgreement: PropTypes.Requireable<boolean>;
                experiencePlanURL: PropTypes.Requireable<any>;
                hideUserExperiencePlan: PropTypes.Requireable<boolean>;
            }>>;
        }>>;
        const firstCustomOptions: PropTypes.Requireable<any[]>;
        const secondCustomOptions: PropTypes.Requireable<any[]>;
    }
}
export default Settings;
export const AllOptions: {};
export namespace SETTING_KEYS {
    export { AllOptions as first_options };
    export { AllOptions as second_options };
}
export const AllOptionsWeight: {};
import PropTypes from "prop-types";
export { AllOptions as firstAllOptions, AllOptions as secondAllOptions };