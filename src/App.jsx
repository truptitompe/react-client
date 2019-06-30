import React, { Fragment } from 'react';

import { WeatherDemo } from './pages';
import { theme } from './theme';
import { ThemeProvider } from '@material-ui/styles';

const App = () => {
	return (
		<Fragment>
			<ThemeProvider theme={theme}>
				<WeatherDemo />
			</ThemeProvider>
		</Fragment>
	);
};

export default App;
