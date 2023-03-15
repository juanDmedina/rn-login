import React from 'react';
import {
  TextInput,
  KeyboardTypeOptions,
  ColorValue,
  StyleProp,
  TextStyle,
} from 'react-native';

interface TextInputProps {
  OnChange: (value: string) => void;
  placeholder: string;
  keyboardType?: KeyboardTypeOptions;
  placeholderTextColor?: ColorValue;
  underlineColorAndroid?: ColorValue;
  selectionColor?: ColorValue;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoCorrect?: boolean;
  secureTextEntry?: boolean;
  maxLength?: number;
  cursorColor?: ColorValue;
  onFocus: () => void;
  style: StyleProp<TextStyle>;
}

const TextInputA = ({
  OnChange,
  placeholder,
  keyboardType = 'email-address',
  placeholderTextColor = 'rgba(17, 12, 12, 0.4)"',
  underlineColorAndroid = 'black',
  selectionColor = 'white',
  autoCapitalize = 'none',
  secureTextEntry = false,
  maxLength = 25,
  cursorColor = 'black',
  onFocus,
  style,
}: TextInputProps) => {
  return (
    <TextInput
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
      underlineColorAndroid={underlineColorAndroid}
      cursorColor={cursorColor}
      onFocus={onFocus}
      style={style}
      selectionColor={selectionColor}
      onChangeText={value => OnChange(value)}
      autoCapitalize={autoCapitalize}
      autoCorrect={false}
      maxLength={maxLength}
    />
  );
};

export default TextInputA;
