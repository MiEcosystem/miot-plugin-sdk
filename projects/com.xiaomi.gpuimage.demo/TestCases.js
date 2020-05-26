'use strict';

import React, { Component } from 'react';
import {
    View,
} from 'react-native';

const {Image: GLImage} = require('gl-react-image');
const resolveAssetSource = require('react-native/Libraries/Image/resolveAssetSource');

import * as GPUImage from "wj-react-native-gpuimage";
import {GPUImage3x3ConvolutionFilter} from "wj-react-native-gpuimage/framework/Filters/ImageProcessing/GPUImage3x3ConvolutionFilter";

const TestImage = {
    A: require("./assets/test_01.jpg"),
    B: require("./assets/test_02.jpg"),
    C: require("./assets/tex_brick.jpg"),
}

const TestCases = [
    /// section: 
    {
        NAME: "GPUImageFilter",
        SLIDER: {
            ENABLE: true,
            DEFAULT: 0.5,
            FROM: 0.0,
            TO: 1.0,
        },
        genFilter: (animValue) => {
            return (
                <GPUImage.GPUImageFilter
                    frag={`
precision highp float;
varying vec2 v_texCoord;
uniform float u_red;
void main() {
    gl_FragColor = vec4(u_red, v_texCoord.x, v_texCoord.y, 1.0);
}
                    `}
                    uniforms={{
                        u_red: animValue,
                    }}
                >
                </GPUImage.GPUImageFilter>
            );
        }
    },
    {
        NAME: "TwoInputFilter",
        SLIDER: {
            ENABLE: false,
            DEFAULT: 0.5,
            FROM: 0.0,
            TO: 1.0,
        },
        genFilter: (animValue) => {
            return (
                <GPUImage.GPUImageTwoInputFilter
                    input2nd={resolveAssetSource(TestImage.C)}
                >
                    <GLImage 
                        source={resolveAssetSource(TestImage.A)}
                        resizeMode="stretch"
                    />
                </GPUImage.GPUImageTwoInputFilter>
            );
        }
    },
    //{
    //    NAME: "3x3TextureSampling",
    //    FILTER: GPUImage.GPUImage3x3TextureSamplingFilter,
    //    SLIDER: {
    //        ENABLE: true,
    //        DEFAULT: 0.5,
    //        FROM: 0.0,
    //        TO: 1.0,
    //    },
    //    genFilter: (children, animValue) => {
    //        return (
    //            <GPUImage.GPUImageFilter>
    //                {children}
    //            </GPUImage.GPUImageFilter>
    //        );
    //    }
    //},


    /// section: Blends
    {
        NAME: "SourceOver",
        SLIDER: {
            ENABLE: false,
            DEFAULT: 0.5,
            FROM: 0.0,
            TO: 1.0,
        },
        genFilter: (animValue) => {
            return (
                <GPUImage.GPUImageSourceOverBlendFilter
                    input2nd={resolveAssetSource(TestImage.C)}
                >
                    <GLImage 
                        source={resolveAssetSource(TestImage.A)}
                        resizeMode="stretch"
                    />
                </GPUImage.GPUImageSourceOverBlendFilter>
            );
        }
    },
    {
        NAME: "ColorBurn",
        SLIDER: {
            ENABLE: false,
            DEFAULT: 0.5,
            FROM: 0.0,
            TO: 1.0,
        },
        genFilter: (animValue) => {
            return (
                <GPUImage.GPUImageColorBurnBlendFilter
                    input2nd={resolveAssetSource(TestImage.C)}
                >
                    <GLImage 
                        source={resolveAssetSource(TestImage.A)}
                        resizeMode="stretch"
                    />
                </GPUImage.GPUImageColorBurnBlendFilter>
            );
        }
    },
    {
        NAME: "ColorDodge",
        FILTER: GPUImage.GPUImageColorDodgeBlendFilter,
        SLIDER: {
            ENABLE: false,
            DEFAULT: 0.5,
            FROM: 0.0,
            TO: 1.0,
        },
        genFilter: (animValue) => {
            return (
                <GPUImage.GPUImageColorDodgeBlendFilter
                    input2nd={resolveAssetSource(TestImage.C)}
                >
                    <GLImage
                        source={resolveAssetSource(TestImage.A)}
                        resizeMode="stretch"
                    />
                </GPUImage.GPUImageColorDodgeBlendFilter>
            );
        }
    },
    {
        NAME: "Darken",
        SLIDER: {
            ENABLE: false,
            DEFAULT: 0.5,
            FROM: 0.0,
            TO: 1.0,
        },
        genFilter: (animValue) => {
            return (
                <GPUImage.GPUImageDarkenBlendFilter
                    input2nd={resolveAssetSource(TestImage.C)}
                >
                    <GLImage
                        source={resolveAssetSource(TestImage.A)}
                        resizeMode="stretch"
                    />
                </GPUImage.GPUImageDarkenBlendFilter>
            );
        }
    },
    {
        NAME: "Difference",
        SLIDER: {
            ENABLE: false,
            DEFAULT: 0.5,
            FROM: 0.0,
            TO: 1.0,
        },
        genFilter: (animValue) => {
            return (
                <GPUImage.GPUImageDifferenceBlendFilter
                    input2nd={resolveAssetSource(TestImage.C)}
                >
                    <GLImage
                        source={resolveAssetSource(TestImage.A)}
                        resizeMode="stretch"
                    />
                </GPUImage.GPUImageDifferenceBlendFilter>
            );
        }
    },
    {
        NAME: "Dissolve",
        SLIDER: {
            ENABLE: false,
            DEFAULT: 0.5,
            FROM: 0.0,
            TO: 1.0,
        },
        genFilter: (animValue) => {
            return (
                <GPUImage.GPUImageDissolveBlendFilter
                    input2nd={resolveAssetSource(TestImage.C)}
                >
                    <GLImage
                        source={resolveAssetSource(TestImage.A)}
                        resizeMode="stretch"
                    />
                </GPUImage.GPUImageDissolveBlendFilter>
            );
        }
    },
    {
        NAME: "Exclusion",
        SLIDER: {
            ENABLE: false,
            DEFAULT: 0.5,
            FROM: 0.0,
            TO: 1.0,
        },
        genFilter: (animValue) => {
            return (
                <GPUImage.GPUImageExclusionBlendFilter
                    input2nd={resolveAssetSource(TestImage.C)}
                >
                    <GLImage
                        source={resolveAssetSource(TestImage.A)}
                        resizeMode="stretch"
                    />
                </GPUImage.GPUImageExclusionBlendFilter>
            );
        }
    },
    {
        NAME: "HardLight",
        SLIDER: {
            ENABLE: false,
            DEFAULT: 0.5,
            FROM: 0.0,
            TO: 1.0,
        },
        genFilter: (animValue) => {
            return (
                <GPUImage.GPUImageHardLightBlendFilter
                    input2nd={resolveAssetSource(TestImage.C)}
                >
                    <GLImage
                        source={resolveAssetSource(TestImage.A)}
                        resizeMode="stretch"
                    />
                </GPUImage.GPUImageHardLightBlendFilter>
            );
        }
    },
    {
        NAME: "SoftLight",
        SLIDER: {
            ENABLE: false,
            DEFAULT: 0.5,
            FROM: 0.0,
            TO: 1.0,
        },
        genFilter: (animValue) => {
            return (
                <GPUImage.GPUImageSoftLightBlendFilter
                    input2nd={resolveAssetSource(TestImage.C)}
                >
                    <GLImage
                        source={resolveAssetSource(TestImage.A)}
                        resizeMode="stretch"
                    />
                </GPUImage.GPUImageSoftLightBlendFilter>
            );
        }
    },
    {
        NAME: "Lighten",
        SLIDER: {
            ENABLE: false,
            DEFAULT: 0.5,
            FROM: 0.0,
            TO: 1.0,
        },
        genFilter: (animValue) => {
            return (
                <GPUImage.GPUImageLightenBlendFilter
                    input2nd={resolveAssetSource(TestImage.C)}
                >
                    <GLImage
                        source={resolveAssetSource(TestImage.A)}
                        resizeMode="stretch"
                    />
                </GPUImage.GPUImageLightenBlendFilter>
            );
        }
    },
    {
        NAME: "Add",
        SLIDER: {
            ENABLE: false,
            DEFAULT: 0.5,
            FROM: 0.0,
            TO: 1.0,
        },
        genFilter: (animValue) => {
            return (
                <GPUImage.GPUImageAddBlendFilter
                    input2nd={resolveAssetSource(TestImage.C)}
                >
                    <GLImage
                        source={resolveAssetSource(TestImage.A)}
                        resizeMode="stretch"
                    />
                </GPUImage.GPUImageAddBlendFilter>
            );
        }
    },
    {
        NAME: "Subtract",
        SLIDER: {
            ENABLE: false,
            DEFAULT: 0.5,
            FROM: 0.0,
            TO: 1.0,
        },
        genFilter: (animValue) => {
            return (
                <GPUImage.GPUImageSubtractBlendFilter
                    input2nd={resolveAssetSource(TestImage.C)}
                >
                    <GLImage
                        source={resolveAssetSource(TestImage.A)}
                        resizeMode="stretch"
                    />
                </GPUImage.GPUImageSubtractBlendFilter>
            );
        }
    },
    {
        NAME: "Divide",
        SLIDER: {
            ENABLE: false,
            DEFAULT: 0.5,
            FROM: 0.0,
            TO: 1.0,
        },
        genFilter: (animValue) => {
            return (
                <GPUImage.GPUImageDivideBlendFilter
                    input2nd={resolveAssetSource(TestImage.C)}
                >
                    <GLImage
                        source={resolveAssetSource(TestImage.A)}
                        resizeMode="stretch"
                    />
                </GPUImage.GPUImageDivideBlendFilter>
            );
        }
    },
    {
        NAME: "Multiply",
        SLIDER: {
            ENABLE: false,
            DEFAULT: 0.5,
            FROM: 0.0,
            TO: 1.0,
        },
        genFilter: (animValue) => {
            return (
                <GPUImage.GPUImageMultiplyBlendFilter
                    input2nd={resolveAssetSource(TestImage.C)}
                >
                    <GLImage
                        source={resolveAssetSource(TestImage.A)}
                        resizeMode="stretch"
                    />
                </GPUImage.GPUImageMultiplyBlendFilter>
            );
        }
    },
    {
        NAME: "Overlay",
        SLIDER: {
            ENABLE: false,
            DEFAULT: 0.5,
            FROM: 0.0,
            TO: 1.0,
        },
        genFilter: (animValue) => {
            return (
                <GPUImage.GPUImageOverlayBlendFilter
                    input2nd={resolveAssetSource(TestImage.C)}
                >
                    <GLImage
                        source={resolveAssetSource(TestImage.A)}
                        resizeMode="stretch"
                    />
                </GPUImage.GPUImageOverlayBlendFilter>
            );
        }
    },
    {
        NAME: "Screen",
        SLIDER: {
            ENABLE: false,
            DEFAULT: 0.5,
            FROM: 0.0,
            TO: 1.0,
        },
        genFilter: (animValue) => {
            return (
                <GPUImage.GPUImageScreenBlendFilter
                    input2nd={resolveAssetSource(TestImage.C)}
                >
                    <GLImage
                        source={resolveAssetSource(TestImage.A)}
                        resizeMode="stretch"
                    />
                </GPUImage.GPUImageScreenBlendFilter>
            );
        }
    },
    {
        NAME: "ChromaKey",
        SLIDER: {
            ENABLE: false,
            DEFAULT: 0.5,
            FROM: 0.0,
            TO: 1.0,
        },
        genFilter: (animValue) => {
            return (
                <GPUImage.GPUImageChromaKeyBlendFilter
                    input2nd={resolveAssetSource(TestImage.C)}
                >
                    <GLImage
                        source={resolveAssetSource(TestImage.A)}
                        resizeMode="stretch"
                    />
                </GPUImage.GPUImageChromaKeyBlendFilter>
            );
        }
    },
    {
        NAME: "Alpha",
        SLIDER: {
            ENABLE: false,
            DEFAULT: 0.5,
            FROM: 0.0,
            TO: 1.0,
        },
        genFilter: (animValue) => {
            return (
                <GPUImage.GPUImageAlphaBlendFilter
                    input2nd={resolveAssetSource(TestImage.C)}
                >
                    <GLImage
                        source={resolveAssetSource(TestImage.A)}
                        resizeMode="stretch"
                    />
                </GPUImage.GPUImageAlphaBlendFilter>
            );
        }
    },
    {
        NAME: "Normal",
        SLIDER: {
            ENABLE: false,
            DEFAULT: 0.5,
            FROM: 0.0,
            TO: 1.0,
        },
        genFilter: (animValue) => {
            return (
                <GPUImage.GPUImageNormalBlendFilter
                    input2nd={resolveAssetSource(TestImage.C)}
                >
                    <GLImage
                        source={resolveAssetSource(TestImage.A)}
                        resizeMode="stretch"
                    />
                </GPUImage.GPUImageNormalBlendFilter>
            );
        }
    },
    {
        NAME: "Color",
        SLIDER: {
            ENABLE: false,
            DEFAULT: 0.5,
            FROM: 0.0,
            TO: 1.0,
        },
        genFilter: (animValue) => {
            return (
                <GPUImage.GPUImageColorBlendFilter
                    input2nd={resolveAssetSource(TestImage.C)}
                >
                    <GLImage
                        source={resolveAssetSource(TestImage.A)}
                        resizeMode="stretch"
                    />
                </GPUImage.GPUImageColorBlendFilter>
            );
        }
    },
    {
        NAME: "Hue",
        SLIDER: {
            ENABLE: false,
            DEFAULT: 0.5,
            FROM: 0.0,
            TO: 1.0,
        },
        genFilter: (animValue) => {
            return (
                <GPUImage.GPUImageHueBlendFilter
                    input2nd={resolveAssetSource(TestImage.C)}
                >
                    <GLImage
                        source={resolveAssetSource(TestImage.A)}
                        resizeMode="stretch"
                    />
                </GPUImage.GPUImageHueBlendFilter>
            );
        }
    },
    {
        NAME: "Saturation",
        SLIDER: {
            ENABLE: false,
            DEFAULT: 0.5,
            FROM: 0.0,
            TO: 1.0,
        },
        genFilter: (animValue) => {
            return (
                <GPUImage.GPUImageSaturationFilter
                    input2nd={resolveAssetSource(TestImage.C)}
                >
                    <GLImage
                        source={resolveAssetSource(TestImage.A)}
                        resizeMode="stretch"
                    />
                </GPUImage.GPUImageSaturationFilter>
            );
        }
    },
    {
        NAME: "Luminosity",
        SLIDER: {
            ENABLE: false,
            DEFAULT: 0.5,
            FROM: 0.0,
            TO: 1.0,
        },
        genFilter: (animValue) => {
            return (
                <GPUImage.GPUImageLuminosityBlendFilter
                    input2nd={resolveAssetSource(TestImage.C)}
                >
                    <GLImage
                        source={resolveAssetSource(TestImage.A)}
                        resizeMode="stretch"
                    />
                </GPUImage.GPUImageLuminosityBlendFilter>
            );
        }
    },
    {
        NAME: "LinearBurn",
        SLIDER: {
            ENABLE: false,
            DEFAULT: 0.5,
            FROM: 0.0,
            TO: 1.0,
        },
        genFilter: (animValue) => {
            return (
                <GPUImage.GPUImageLinearBurnBlendFilter
                    input2nd={resolveAssetSource(TestImage.C)}
                >
                    <GLImage
                        source={resolveAssetSource(TestImage.A)}
                        resizeMode="stretch"
                    />
                </GPUImage.GPUImageLinearBurnBlendFilter>
            );
        }
    },
    {
        NAME: "Mask",
        SLIDER: {
            ENABLE: false,
            DEFAULT: 0.5,
            FROM: 0.0,
            TO: 1.0,
        },
        genFilter: (animValue) => {
            return (
                <GPUImage.GPUImageMaskFilter
                    input2nd={resolveAssetSource(TestImage.C)}
                >
                    <GLImage
                        source={resolveAssetSource(TestImage.A)}
                        resizeMode="stretch"
                    />
                </GPUImage.GPUImageMaskFilter>
            );
        }
    },

    /// section: Color 
    {
        NAME: "Grayscale",
        SLIDER: {
            ENABLE: false,
            DEFAULT: 0.5,
            FROM: 0.0,
            TO: 1.0,
        },
        genFilter: (animValue) => {
            return (
                <GPUImage.GPUImageGrayscaleFilter>
                    <GLImage
                        source={resolveAssetSource(TestImage.A)}
                        resizeMode="stretch"
                    />
                </GPUImage.GPUImageGrayscaleFilter>
            );
        }
    },
    {
        NAME: "ColorInvert",
        SLIDER: {
            ENABLE: false,
            DEFAULT: 0.5,
            FROM: 0.0,
            TO: 1.0,
        },
        genFilter: (animValue) => {
            return (
                <GPUImage.GPUImageColorInvertFilter>
                    <GLImage
                        source={resolveAssetSource(TestImage.A)}
                        resizeMode="stretch"
                    />
                </GPUImage.GPUImageColorInvertFilter>
            );
        }
    },
    {
        NAME: "LuminanceThreshold",
        SLIDER: {
            ENABLE: true,
            DEFAULT: 0.5,
            FROM: 0.0,
            TO: 1.0,
        },
        genFilter: (animValue) => {
            return (
                <GPUImage.GPUImageLuminanceThresholdFilter threshold={animValue}>
                    <GLImage
                        source={resolveAssetSource(TestImage.A)}
                        resizeMode="stretch"
                    />
                </GPUImage.GPUImageLuminanceThresholdFilter>
            );
        }
    },
    {
        NAME: "Brightness",
        SLIDER: {
            ENABLE: true,
            DEFAULT: 0.5,
            FROM: 0.0,
            TO: 1.0,
        },
        genFilter: (animValue) => {
            return (
                <GPUImage.GPUImageBrightnessFilter brightness={animValue}>
                    <GLImage
                        source={resolveAssetSource(TestImage.A)}
                        resizeMode="stretch"
                    />
                </GPUImage.GPUImageBrightnessFilter>
            );
        }
    },
    {
        NAME: "Contrast",
        SLIDER: {
            ENABLE: true,
            DEFAULT: 0.5,
            FROM: 0.0,
            TO: 1.0,
        },
        genFilter: (animValue) => {
            return (
                <GPUImage.GPUImageContrastFilter contrast={animValue}>
                    <GLImage
                        source={resolveAssetSource(TestImage.A)}
                        resizeMode="stretch"
                    />
                </GPUImage.GPUImageContrastFilter>
            );
        }
    },
    {
        NAME: "Saturation",
        SLIDER: {
            ENABLE: true,
            DEFAULT: 0.5,
            FROM: 0.0,
            TO: 1.0,
        },
        genFilter: (animValue) => {
            return (
                <GPUImage.GPUImageSaturationFilter saturation={animValue}>
                    <GLImage
                        source={resolveAssetSource(TestImage.A)}
                        resizeMode="stretch"
                    />
                </GPUImage.GPUImageSaturationFilter>
            );
        }
    },
    {
        NAME: "Gamma",
        SLIDER: {
            ENABLE: true,
            DEFAULT: 0.5,
            FROM: 0.0,
            TO: 1.0,
        },
        genFilter: (animValue) => {
            return (
                <GPUImage.GPUImageGammaFilter gamma={animValue}>
                    <GLImage
                        source={resolveAssetSource(TestImage.A)}
                        resizeMode="stretch"
                    />
                </GPUImage.GPUImageGammaFilter>
            );
        }
    },
    {
        NAME: "ColorMatrix",
        SLIDER: {
            ENABLE: true,
            DEFAULT: 0.5,
            FROM: 0.0,
            TO: 1.0,
        },
        genFilter: (animValue) => {
            return (
                <GPUImage.GPUImageColorMatrixFilter matrix={[(1.0 - animValue),       0.0, 0.0, 0.0,
                                                                           0.0, animValue, 0.0, 0.0,
                                                                           0.0,       0.0, 1.0, 0.0,
                                                                           0.0,       0.0, 1.0, 1.0]}
                                                    offset={[0.0, 0.0, 0.0, 0.0]}>
                    <GLImage
                        source={resolveAssetSource(TestImage.A)}
                        resizeMode="stretch"
                    />
                </GPUImage.GPUImageColorMatrixFilter>
            );
        }
    },
    {
        NAME: "RGB",
        FILTER: GPUImage.GPUImageRGBFilter,
        SLIDER: {
            ENABLE: true,
            DEFAULT: 0.5,
            FROM: 0.0,
            TO: 1.0,
        },
        genFilter: (animValue) => {
            return (
                <GPUImage.GPUImageRGBFilter r={1.0} g={animValue} b={1.0}>
                    <GLImage
                        source={resolveAssetSource(TestImage.A)}
                        resizeMode="stretch"
                    />
                </GPUImage.GPUImageRGBFilter>
            );
        }
    },

    /// section: Effects 
    {
        NAME: "Pixelate",
        SLIDER: {
            ENABLE: true,
            DEFAULT: 0.02,
            FROM: 0.02,
            TO: 0.2,
        },
        genFilter: (animValue) => {
            return (
                <GPUImage.GPUImagePixelateFilter fractionalWidthOfPixel={animValue}>
                    <GLImage
                        source={resolveAssetSource(TestImage.A)}
                        resizeMode="stretch"
                    />
                </GPUImage.GPUImagePixelateFilter>
            );
        }
    },
    {
        NAME: "PixelatePosition",
        SLIDER: {
            ENABLE: true,
            DEFAULT: 0.02,
            FROM: 0.02,
            TO: 0.2,
        },
        genFilter: (animValue) => {
            return (
                <GPUImage.GPUImagePixelatePositionFilter fractionalWidthOfPixel={animValue}>
                    <GLImage
                        source={resolveAssetSource(TestImage.A)}
                        resizeMode="stretch"
                    />
                </GPUImage.GPUImagePixelatePositionFilter>
            );
        }
    },
    {
        NAME: "PolkaDot",
        SLIDER: {
            ENABLE: true,
            DEFAULT: 0.02,
            FROM: 0.02,
            TO: 0.2,
        },
        genFilter: (animValue) => {
            return (
                <GPUImage.GPUImagePolkaDotFilter fractionalWidthOfPixel={animValue}>
                    <GLImage
                        source={resolveAssetSource(TestImage.A)}
                        resizeMode="stretch"
                    />
                </GPUImage.GPUImagePolkaDotFilter>
            );
        }
    },
    {
        NAME: "Halftone",
        SLIDER: {
            ENABLE: true,
            DEFAULT: 0.02,
            FROM: 0.02,
            TO: 0.2,
        },
        genFilter: (animValue) => {
            return (
                <GPUImage.GPUImageHalftoneFilter fractionalWidthOfPixel={animValue}>
                    <GLImage
                        source={resolveAssetSource(TestImage.A)}
                        resizeMode="stretch"
                    />
                </GPUImage.GPUImageHalftoneFilter>
            );
        }
    },
    {
        NAME: "Crosshatch",
        FILTER: GPUImage.GPUImageCrosshatchFilter,
        SLIDER: {
            ENABLE: true,
            DEFAULT: 0.03,
            FROM: 0.02,
            TO: 0.1,
        },
        genFilter: (animValue) => {
            return (
                <GPUImage.GPUImageCrosshatchFilter spacing={animValue}>
                    <GLImage
                        source={resolveAssetSource(TestImage.A)}
                        resizeMode="stretch"
                    />
                </GPUImage.GPUImageCrosshatchFilter>
            );
        }
    },
    {
        NAME: "Sketch",
        FILTER: GPUImage.GPUImageSketchFilter,
        SLIDER: {
            ENABLE: true,
            DEFAULT: 0.5,
            FROM: 0.0,
            TO: 1.0,
        },
        genFilter: (animValue) => {
            return (
                <GPUImage.GPUImageSketchFilter
                    texelWidth={1.0 / 850.0}
                    texelHeight={1.0 / 850.0}
                    edgeStrength={animValue}
                >
                    <GLImage
                        source={resolveAssetSource(TestImage.A)}
                        resizeMode="stretch"
                    />
                </GPUImage.GPUImageSketchFilter>
            );
        }
    },
    {
        NAME: "ThresholdSketch",
        FILTER: GPUImage.GPUImageThresholdSketchFilter,
        SLIDER: {
            ENABLE: true,
            DEFAULT: 0.5,
            FROM: 0.0,
            TO: 1.0,
        },
        genFilter: (animValue) => {
            return (
                <GPUImage.GPUImageThresholdSketchFilter
                    texelWidth={1.0 / 850.0} 
                    texelHeight={1.0 / 850.0} 
                    edgeStrength={animValue}
                    threshold={0.1}
                >
                    <GLImage
                        source={resolveAssetSource(TestImage.A)}
                        resizeMode="stretch"
                    />
                </GPUImage.GPUImageThresholdSketchFilter>
            );
        }
    },
    {
        NAME: "Emboss",
        FILTER: GPUImage.GPUImageEmbossFilter,
        SLIDER: {
            ENABLE: true,
            DEFAULT: 0.5,
            FROM: 0.5,
            TO: 3.5,
        },
        genFilter: (animValue) => {
            return (
                <GPUImage.GPUImageEmbossFilter
                    texelWidth={1.0 / 850.0} 
                    texelHeight={1.0 / 850.0} 
                    intensity={animValue}
                >
                    <GLImage
                        source={resolveAssetSource(TestImage.A)}
                        resizeMode="stretch"
                    />
                </GPUImage.GPUImageEmbossFilter>
            );
        }
    },
    {
        NAME: "Toon",
        FILTER: GPUImage.GPUImageToonFilter,
        SLIDER: {
            ENABLE: true,
            DEFAULT: 0.2,
            FROM: 0.0,
            TO: 1.0,
        },
        genFilter: (animValue) => {
            return (
                <GPUImage.GPUImageToonFilter
                    texelWidth={1.0 / 850.0} 
                    texelHeight={1.0 / 850.0} 
                    //levels={animValue}
                    threshold={animValue}
                >
                    <GLImage
                        source={resolveAssetSource(TestImage.A)}
                        resizeMode="stretch"
                    />
                </GPUImage.GPUImageToonFilter>
            );
        }
    },
    {
        NAME: "Vignette",
        FILTER: GPUImage.GPUImageVignetteFilter,
        SLIDER: {
            ENABLE: true,
            DEFAULT: 0.5,
            FROM: 0.3,
            TO: 0.6,
        },
        genFilter: (animValue) => {
            return (
                <GPUImage.GPUImageVignetteFilter
                    start={animValue}
                >
                    <GLImage
                        source={resolveAssetSource(TestImage.A)}
                        resizeMode="stretch"
                    />
                </GPUImage.GPUImageVignetteFilter>
            );
        }
    },

    /// section: Image 
    {
        NAME: "3x3Convolution",
        SLIDER: {
            ENABLE: true,
            DEFAULT: 0.5,
            FROM: 0.5,
            TO: 10.0,
        },
        genFilter: (animValue) => {
            let a = -animValue;
            let b = 1.0 - 8.0 * a;
            return (
                <GPUImage.GPUImage3x3ConvolutionFilter
                    texelWidth={1.0 / 850.0} 
                    texelHeight={1.0 / 850.0} 
                    convolutionMatrix={[a, a, a,
                                        a, b, a,
                                        a, a, a,]}
                >
                    <GLImage
                        source={resolveAssetSource(TestImage.A)}
                        resizeMode="stretch"
                    />
                </GPUImage.GPUImage3x3ConvolutionFilter>
            );
        }
    },
    {
        NAME: "SobelEdgeDetection",
        SLIDER: {
            ENABLE: true,
            DEFAULT: 1.0,
            FROM: 1.0,
            TO: 3.0,
        },
        genFilter: (animValue) => {
            return (
                <GPUImage.GPUImageSobelEdgeDetectionFilter
                    texelWidth={1.0 / 850.0} 
                    texelHeight={1.0 / 850.0} 
                    edgeStrength={animValue}
                >
                    <GLImage
                        source={resolveAssetSource(TestImage.A)}
                        resizeMode="stretch"
                    />
                </GPUImage.GPUImageSobelEdgeDetectionFilter>
            );
        }
    },
    {
        NAME: "ThresholdEdgeDetection",
        FILTER: GPUImage.GPUImageThresholdEdgeDetectionFilter,
        SLIDER: {
            ENABLE: true,
            DEFAULT: 0.25,
            FROM: 0.1,
            TO: 0.7,
        },
        genFilter: (animValue) => {
            return (
                <GPUImage.GPUImageThresholdEdgeDetectionFilter
                    texelWidth={1.0 / 850.0} 
                    texelHeight={1.0 / 850.0} 
                    threshold={animValue}
                >
                    <GLImage
                        source={resolveAssetSource(TestImage.A)}
                        resizeMode="stretch"
                    />
                </GPUImage.GPUImageThresholdEdgeDetectionFilter>
            );
        }
    },
    {
        NAME: "SingleComponentGaussianBlur",
        FILTER: GPUImage.GPUImageSingleComponentGaussianBlurFilter,
        SLIDER: {
            ENABLE: true,
            DEFAULT: 0.0,
            FROM: 0.0,
            TO: 1.0,
        },
        genFilter: (animValue) => {
            let sigma = 1.0 / (150.0 * (animValue + 1.0));
            return (
                <GPUImage.GPUImageSingleComponentGaussianBlurFilter
                    texelWidth={1.0 / 850.0} 
                    texelHeight={1.0 / 850.0} 
                    sigma={sigma}
                >
                    <GLImage
                        source={resolveAssetSource(TestImage.A)}
                        resizeMode="stretch"
                    />
                </GPUImage.GPUImageSingleComponentGaussianBlurFilter>
            );
        }
    },
    //{
    //    NAME: "DirectionalSobelEdgeDetection",
    //    SLIDER: {
    //        ENABLE: true,
    //        DEFAULT: 0.5,
    //        FROM: 0.0,
    //        TO: 1.0,
    //    },
    //    genFilter: (animValue) => {
    //        return (
    //            <GPUImage.GPUImageFilter>
    //                {children}
    //            </GPUImage.GPUImageFilter>
    //        );
    //    }
    //},
    //{
    //    NAME: "DirectionalNonMaximumSuppression",
    //    SLIDER: {
    //        ENABLE: true,
    //        DEFAULT: 0.5,
    //        FROM: 0.0,
    //        TO: 1.0,
    //    },
    //    genFilter: (animValue) => {
    //        return (
    //            <GPUImage.GPUImageFilter>
    //                {children}
    //            </GPUImage.GPUImageFilter>
    //        );
    //    }
    //},
    //{
    //    NAME: "WeakPixelInclusion",
    //    SLIDER: {
    //        ENABLE: true,
    //        DEFAULT: 0.5,
    //        FROM: 0.0,
    //        TO: 1.0,
    //    },
    //    genFilter: (animValue) => {
    //        return (
    //            <GPUImage.GPUImageFilter>
    //                {children}
    //            </GPUImage.GPUImageFilter>
    //        );
    //    }
    //},
    {
        NAME: "CannyEdgeDetection",
        SLIDER: {
            ENABLE: true,
            DEFAULT: 0.5,
            FROM: 0.0,
            TO: 1.0,
        },
        genFilter: (animValue) => {
            let sigma = 1.0 / (150.0 * (animValue + 1.0));
            return (
                <GPUImage.GPUImageCannyEdgeDetectionFilter
                    texelWidth={1.0 / 850.0} 
                    texelHeight={1.0 / 850.0} 
                    blurSigma={sigma}
                    lowerThreshold={0.1}
                    upperThreshold={0.4}
                >
                    <GLImage
                        source={resolveAssetSource(TestImage.A)}
                        resizeMode="stretch"
                    />
                </GPUImage.GPUImageCannyEdgeDetectionFilter>
            );
        }
    },
    {
        NAME: "LocalBinaryPattern",
        SLIDER: {
            ENABLE: false,
            DEFAULT: 0.5,
            FROM: 0.0,
            TO: 1.0,
        },
        genFilter: (animValue) => {
            return (
                <GPUImage.GPUImageLocalBinaryPatternFilter
                    texelWidth={1.0 / 850.0} 
                    texelHeight={1.0 / 850.0} 
                >
                    <GLImage
                        source={resolveAssetSource(TestImage.B)}
                        resizeMode="stretch"
                    />
                </GPUImage.GPUImageLocalBinaryPatternFilter>
            );
        }
    },
    {
        NAME: "ColorLocalBinaryPattern",
        SLIDER: {
            ENABLE: false,
            DEFAULT: 0.5,
            FROM: 0.0,
            TO: 1.0,
        },
        genFilter: (animValue) => {
            return (
                <GPUImage.GPUImageColorLocalBinaryPatternFilter
                    texelWidth={1.0 / 850.0} 
                    texelHeight={1.0 / 850.0} 
                >
                    <GLImage
                        source={resolveAssetSource(TestImage.B)}
                        resizeMode="stretch"
                    />
                </GPUImage.GPUImageColorLocalBinaryPatternFilter>
            );
        }
    },
];

export default TestCases;