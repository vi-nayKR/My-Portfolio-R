import { RouterProvider } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { router } from './routes';
import { Cursor } from './components/Cursor';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Cursor />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
