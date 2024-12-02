import { Canvas, Circle, Group, Skia, Text, useFont } from '@shopify/react-native-skia'
import { area, scaleLinear } from 'd3'
import React, { useEffect } from 'react'
import { Easing, useDerivedValue, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';

interface WaveProgressProps {
    size: number;
    value: number;
    outerColor: string;
    outerTextColor: string;
    innerTextColor: string;
}

export default function WaveProgress({ size, value, outerColor, outerTextColor, innerTextColor }: WaveProgressProps) {
    // ---------------------------- Outer circle VARIABLEs ----------------------------
    const radius = size * 0.5;
    const circleThickness = radius * 0.05;


    // ---------------------------- Inner circle VARIABLEs ----------------------------
    const circleFillGap = 0.05 * radius;
    const fillCircleMargin = circleThickness + circleFillGap;
    const fillCircleRadius = radius - fillCircleMargin;


    // ---------------------------- CONFIG Waves VARIABLEs ----------------------------
    const minValue = 0
    const maxValue = 100
    const fillPercent = Math.max(minValue, Math.min(maxValue, value)) / maxValue;

    const waveCount = 1;
    const waveClipCount = waveCount + 1;
    const waveLength = (fillCircleRadius * 2) / waveCount;
    const waveClipWidth = waveLength * waveClipCount;
    const waveHeight = fillCircleRadius * 0.1;


    // ---------------------------- CONFIG Text VARIABLEs ----------------------------
    const fontSize = radius / 2;
    const font = useFont(require("../assets/fonts/Roboto-Bold.ttf"), fontSize);

    // const text = `${value}%` // convert value to String
    const textWidth = font?.getTextWidth(`${value}`) ?? 0;
    const textTranslateX = radius - textWidth * 0.65;
    const textTransform = [{ translateY: size * 0.5 - fontSize * 0.6 }];


    // ---------------------------- MAKE Waves ----------------------------
    const data: Array<[number, number]> = [];
    for (let i = 0; i <= 40 * waveClipCount; i++) {
        data.push([i / (40 * waveClipCount), i / 40])
    }

    const waveScaleX = scaleLinear().range([0, waveClipWidth]).domain([0, 1]);
    const waveScaleY = scaleLinear().range([0, waveHeight]).domain([0, 1]);

    const clipArea = area()
        .x(function (d) {
            return waveScaleX(d[0]);
        })
        .y0(function (d) {
            return waveScaleY(Math.sin(d[1] * 2 * Math.PI));
        })
        .y1(function (_d) {
            return fillCircleRadius * 2 + waveHeight;
        });


    // ---------------------------- MAKE Waves MOVE ----------------------------
    const clipSvgPath = clipArea(data) ?? "";

    const translateXAnimated = useSharedValue(0);
    const translateYPercent = useSharedValue(0);
    const textValue = useSharedValue(0);

    // TEXT Animation
    useEffect(() => {
        textValue.value = withTiming(
            value,
            { duration: 1000 }
        )
    }, [value]);

    const text = useDerivedValue(() => {
        return `${textValue.value.toFixed(0)}%`;
    }, [textValue])

    // Y WAVEs Animation
    useEffect(() => {
        translateYPercent.value = withTiming(
            fillPercent,
            { duration: 1000 }
        )
    }, [fillPercent]);

    // X WAVEs Animation
    useEffect(() => {
        translateXAnimated.value = withRepeat(
            withTiming(1, {
                duration: 6000,
                easing: Easing.linear,
            }),
            -1
        );
    }, []);

    const clipPath = useDerivedValue(() => {
        const clipP = Skia.Path.MakeFromSVGString(clipSvgPath);
        const transformMatrix = Skia.Matrix();

        transformMatrix.translate(
            fillCircleMargin - waveLength * translateXAnimated.value,
            fillCircleMargin + (1 - translateYPercent.value) * fillCircleRadius * 2 - waveHeight,
        );
        clipP?.transform(transformMatrix);

        return clipP
    }, [translateXAnimated])


    //! ---------------------------- RETURN ----------------------------
    return (
        <Canvas style={{ width: size, height: size }}>
            <Circle
                cx={radius}
                cy={radius}
                r={radius - circleThickness * 0.5}
                color={outerColor}
                style='stroke'
                strokeWidth={circleThickness}
            />

            {/* Text out of water */}
            <Text
                x={textTranslateX}
                y={fontSize}
                text={text}
                font={font}
                color={outerTextColor}
                transform={textTransform}
            />

            <Group clip={clipPath ?? ""}>
                <Circle cx={radius} cy={radius} r={fillCircleRadius} color='#178bca' />

                {/* Text insite water */}
                <Text
                    x={textTranslateX}
                    y={fontSize}
                    text={text}
                    font={font}
                    color={innerTextColor}
                    transform={textTransform}
                />
            </Group>
        </Canvas>
    )
}