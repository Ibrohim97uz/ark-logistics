import { useEffect } from 'react';
import '@fake-db';
import FuseAuthorization from '@fuse/core/FuseAuthorization';
import FuseLayout from '@fuse/core/FuseLayout';
import FuseTheme from '@fuse/core/FuseTheme';
import history from '@history';
import { createGenerateClassName, jssPreset, StylesProvider } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { create } from 'jss';
import jssExtend from 'jss-plugin-extend';
import rtl from 'jss-rtl';
import Provider from 'react-redux/es/components/Provider';
import { Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { SnackbarProvider } from 'notistack';
import DateFnsUtils from '@date-io/date-fns';
import AppContext from './AppContext';
import { Auth } from './auth';
import routes from './fuse-configs/routesConfig';
import store from './store';

/* I18N */
import '../i18n';

const jss = create({
	...jssPreset(),
	plugins: [...jssPreset().plugins, jssExtend(), rtl()],
	insertionPoint: document.getElementById('jss-insertion-point')
});

const generateClassName = createGenerateClassName({ disableGlobal: true });

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			refetchOnReconnect: false,
			retry: 1
		}
	}
});

const App = () => {
	useEffect(() => {
		if (!localStorage.getItem('locale')) {
			localStorage.setItem('locale', 'en');
		}
	}, []);

	return (
		<AppContext.Provider
			value={{
				routes
			}}
		>
			<StylesProvider jss={jss} generateClassName={generateClassName}>
				<Provider store={store}>
					<QueryClientProvider client={queryClient}>
						<MuiPickersUtilsProvider utils={DateFnsUtils}>
							<Auth>
								<Router history={history}>
									<FuseAuthorization>
										<FuseTheme>
											<SnackbarProvider
												maxSnack={5}
												anchorOrigin={{
													vertical: 'bottom',
													horizontal: 'right'
												}}
												classes={{
													containerRoot: 'bottom-0 right-0 mb-52 md:mb-68 mr-8 lg:mr-80 z-99'
												}}
											>
												<FuseLayout />
											</SnackbarProvider>
										</FuseTheme>
									</FuseAuthorization>
								</Router>
							</Auth>
						</MuiPickersUtilsProvider>
					</QueryClientProvider>
				</Provider>
			</StylesProvider>
		</AppContext.Provider>
	);
};

export default App;
