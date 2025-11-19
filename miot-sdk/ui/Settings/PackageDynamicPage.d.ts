declare function DynamicPage({ navigation }: {
    navigation: any;
}): JSX.Element;
declare namespace DynamicPage {
    function navigationOptions({ navigation }: {
        navigation: any;
    }): {
        header: JSX.Element;
    };
}
export default DynamicPage;