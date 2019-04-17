import React from 'react';

import Svg,{
    Circle,
    Ellipse,
    TSpan,
    G,
    LinearGradient,
    RadialGradient,
    Line,
    Path,
    Polygon,
    Polyline,
    Rect,
    Image, // react-native image
    Symbol,
    Text,
    TextPath,
    ClipPath,
    Use,
    Defs,
    Stop
} from 'react-native-svg';

// import {
//     Image
//   } from 'react-native';


var customePath =   <Path
d="M25 10 L98 65 L70 25 L16 77 L11 30 L0 4 L90 50 L50 10 L11 22 L77 95 L20 25"
fill="none"
stroke="red"
/>

export default class SVGDemo extends React.Component {

    test1 = (
    <Svg
    height="100"
    width="100"
    >
    <Rect x="0" y="0" width="100" height="100" fill="black" />
    <Circle cx="50" cy="50" r="30" fill="yellow" />
    <Circle cx="40" cy="40" r="4" fill="black" />
    <Circle cx="60" cy="40" r="4" fill="black" />
    <Path d="M 40 60 A 10 10 0 0 0 60 60" stroke="black" />
    </Svg>
    )

    test2 = (
        <Svg
        height="100"
        width="100"
    >
        <Circle
            cx="50"
            cy="50"
            r="45"
            stroke="blue"
            strokeWidth="2.5"
            fill="green"
        />
        <Rect
            x="15"
            y="15"
            width="70"
            height="70"
            stroke="red"
            strokeWidth="2"
            fill="yellow"
        />
    </Svg>)

    test3 = (
    <Svg
        width="200"
        height="60"
    >
    <Rect
        x="25"
        y="5"
        width="150"
        height="50"
        fill="rgb(0,0,255)"
        strokeWidth="3"
        stroke="rgb(0,0,0)"
    />
    </Svg>
    )

    test4 = (<Svg
    height="100"
    width="100"
    >
    <Circle
        cx="50"
        cy="50"
        r="50"
        fill="pink"
    />
    </Svg>)

    test5 = (
        <Svg
    height="100"
    width="110"
>
    <Ellipse
        cx="55"
        cy="55"
        rx="50"
        ry="30"
        stroke="purple"
        strokeWidth="2"
        fill="yellow"
    />
    </Svg>
    )

    test6 = (
        <Svg
    height="100"
    width="100"
    >
    <Line
        x1="0"
        y1="0"
        x2="100"
        y2="100"
        stroke="red"
        strokeWidth="2"
    />
    </Svg>
    )

    test7 = (
        <Svg
    height="100"
    width="100"
    >
    <Polygon
        points="40,5 70,80 25,95"
        fill="lime"
        stroke="purple"
        strokeWidth="1"
    />
    </Svg>
    )

    test8 = (
    <Svg
    height="100"
    width="100"
    >
    <Polyline
        points="10,10 20,12 30,20 40,60 60,70 95,90"
        fill="none"
        stroke="black"
        strokeWidth="3"
    />
    </Svg>
    )

    test9 = (
    <Svg
    height="100"
    width="100"
    >
    <Path
        d="M25 10 L98 65 L70 25 L16 77 L11 30 L0 4 L90 50 L50 10 L11 22 L77 95 L20 25"
        fill="none"
        stroke="red"
    />
    </Svg>
    )

    test10 = (
        <Svg
    height="60"
    width="200"
    >
    <Text
        fill="#ffffff"
        stroke="purple"
        fontSize="20"
        fontWeight="bold"
        x="100"
        y="20"
        textAnchor="middle"
    >STROKED TEXT</Text>
    </Svg>
    )

    test11 = (
        <Svg
    height="160"
    width="200"
>
    <Text y="20" dx="5 5">
        <TSpan x="10" >tspan line 1</TSpan>
        <TSpan x="10" dy="15">tspan line 2</TSpan>
        <TSpan x="10" dx="10" dy="15">tspan line 3</TSpan>
    </Text>
    <Text x="10" y="60" fill="red" fontSize="14">
        <TSpan dy="5 10 20" >12345</TSpan>
        <TSpan fill="blue" dy="15" dx="0 5 5">
            <TSpan>6</TSpan>
            <TSpan>7</TSpan>
        </TSpan>
        <TSpan dx="0 10 20" dy="0 20" fontWeight="bold" fontSize="12">89a</TSpan>
    </Text>
    <Text y="140" dx="0 5 5" dy="0 -5 -5">delta on text</Text>
</Svg>
    )

//     test12 = (
//         <Svg
//     height="100"
//     width="200"
// >
//     <Defs>
//         <Path
//             id="path"
//             d={customePath}
//         />
//     </Defs>
//     <G y="20">
//         <Text
//             fill="blue"

//         >
//             <TextPath href="#path" startOffset="-10%">
//                 We go up and down,
//                 <TSpan fill="red" dy="5,5,5">then up again</TSpan>
//             </TextPath>
//         </Text>
//         <Path
//             d={customePath}
//             fill="none"
//             stroke="red"
//             strokeWidth="1"
//         />
//     </G>
// </Svg>
//     )


test13 = (
    <Svg
    height="100"
    width="200"
>
    <G
        rotation="50"
        origin="100, 50"
    >
        <Line
            x1="60"
            y1="10"
            x2="140"
            y2="10"
            stroke="#060"
        />

        <Rect
            x="60"
            y="20"
            height="50"
            width="80"
            stroke="#060"
            fill="#060"
        />

        <Text
            x="100"
            y="75"
            stroke="#600"
            fill="#600"
            textAnchor="middle"
        >
            Text grouped with shapes</Text>
    </G>
</Svg>
)

    test14 = (
        <Svg
    height="100"
    width="300"
>
    <Defs>
        <G id="shape">
            <G>
                <Circle cx="50" cy="50" r="50" />
                <Rect x="50" y="50" width="50" height="50" />
                <Circle cx="50" cy="50" r="5" fill="blue" />
            </G>
        </G>
    </Defs>
    <Use href="#shape" x="20" y="0"/>
    <Use href="#shape" x="170"y="0" />
</Svg>
    )

    test15 = (
        <Svg
    height="150"
    width="110"
>
    <Symbol id="symbol" viewBox="0 0 150 110" width="100" height="50">
        <Circle cx="50" cy="50" r="40" strokeWidth="8" stroke="red" fill="red"/>
        <Circle cx="90" cy="60" r="40" strokeWidth="8" stroke="green" fill="white"/>
    </Symbol>

    <Use
        href="#symbol"
        x="0"
        y="0"
    />
    <Use
        href="#symbol"
        x="0"
        y="50"
        width="75"
        height="38"
    />
    <Use
        href="#symbol"
        x="0"
        y="100"
        width="50"
        height="25"
    />
</Svg>
    )

    test16 = (
        <Svg
    height="100"
    width="100"
>
    <Defs>
        <ClipPath id="clip">
            <Circle cx="50%" cy="50%" r="40%"/>
        </ClipPath>
    </Defs>
    <Rect
        x="0"
        y="0"
        width="100%"
        height="100%"
        fill="red"
    />
    <Rect
        x="5%"
        y="5%"
        width="50%"
        height="90%"
    />

    <Image
        x="5%"
        y="5%"
        width="50%"
        height="90%"
        preserveAspectRatio="xMidYMid slice"
        opacity="0.5"
        href={require('../Resources/mysprite.png')}
        clipPath="url(#clip)"
    />
    <Text
        x="50"
        y="50"
        textAnchor="middle"
        fontWeight="bold"
        fontSize="16"
        fill="blue"
    >HOGWARTS</Text>
</Svg>
    )

    test17 = (
        <Svg
    height="100"
    width="100"
>
    <Defs>
        <RadialGradient id="grad" cx="50%" cy="50%" rx="50%" ry="50%" fx="50%" fy="50%" gradientUnits="userSpaceOnUse">
            <Stop
                offset="0%"
                stopColor="#ff0"
                stopOpacity="1"
            />
            <Stop
                offset="100%"
                stopColor="#00f"
                stopOpacity="1"
            />
        </RadialGradient>
        <ClipPath id="clip">
            <G scale="0.9" x="10">
                <Circle cx="30" cy="30" r="20"/>
                <Ellipse cx="60" cy="70" rx="20" ry="10" />
                <Rect x="65" y="15" width="30" height="30" />
                <Polygon points="20,60 20,80 50,70" />
                <Text
                    x="50"
                    y="30"
                    fontSize="32"
                    fonWeight="bold"
                    textAnchor="middle"
                    scale="1.2"
                >Q</Text>
            </G>
        </ClipPath>
    </Defs>
    <Rect
        x="0"
        y="0"
        width="100"
        height="100"
        fill="url(#grad)"
        clipPath="url(#clip)"
    />
</Svg>
    )

    test18 = (
        <Svg
    height="150"
    width="300"
>
    <Defs>
        <LinearGradient id="grad" x1="0" y1="0" x2="170" y2="0">
            <Stop offset="0" stopColor="rgb(255,255,0)" stopOpacity="0" />
            <Stop offset="1" stopColor="red" stopOpacity="1" />
        </LinearGradient>
    </Defs>
    <Ellipse cx="150" cy="75" rx="85" ry="55" fill="url(#grad)" />
</Svg>
    )

    test19 = (
        <Svg
    height="150"
    width="300"
>
    <Defs>
        <RadialGradient id="grad" cx="150" cy="75" rx="85" ry="55" fx="150" fy="75" gradientUnits="userSpaceOnUse">
            <Stop
                offset="0"
                stopColor="#ff0"
                stopOpacity="1"
            />
            <Stop
                offset="1"
                stopColor="#83a"
                stopOpacity="1"
            />
        </RadialGradient>
    </Defs>
    <Ellipse cx="150" cy="75" rx="85" ry="55" fill="url(#grad)" />
</Svg>
    )

    test20 = (
        <Svg
        height="150"
        width="150">
            <Circle
                cx="50%"
                cy="50%"
                r="38%"
                fill="red"
                onPress={() => alert('Press on Circle')}
            />
        </Svg>
    )

    // test12有问题
    render() {
        return (
           this.test10
        );
    }
}
