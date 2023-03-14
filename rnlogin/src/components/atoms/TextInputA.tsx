import React from 'react';
import {
  TextInput,
  Platform,
  KeyboardTypeOptions,
  ColorValue,
} from 'react-native';
import {loginStyles} from '../../theme/loginTheme';

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
}: TextInputProps) => {
  return (
    <TextInput
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
      underlineColorAndroid={underlineColorAndroid}
      style={[
        loginStyles.inputField,
        Platform.OS === 'ios' && loginStyles.inputFieldIOS,
      ]}
      selectionColor={selectionColor}
      onChangeText={value => OnChange(value)}
      autoCapitalize={autoCapitalize}
      autoCorrect={false}
      maxLength={maxLength}
    />
  );
};

export default TextInputA;
