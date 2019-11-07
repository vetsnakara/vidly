import React from 'react';

const UserContext = React.createContext();

const { Provider, Consumer } = UserContext;

export { Provider as UserProvider, Consumer as UserConsumer };

export default UserContext;
