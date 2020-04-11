import styled from 'styled-components/native';
import { WebView } from 'react-native-webview';

export const Browser = styled(WebView)`
  flex: 1;
`;

export const Loading = styled.ActivityIndicator.attrs({
  color: '#7159c1',
  size: 25,
})`
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;
