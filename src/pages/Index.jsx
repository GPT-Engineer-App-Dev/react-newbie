import { useState } from "react";
import { Container, VStack, Input, Button, Text, Box } from "@chakra-ui/react";
import { supabase } from "../integrations/supabase/index.js";
import { useSupabaseAuth } from "../integrations/supabase/auth.jsx";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { session } = useSupabaseAuth();

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      {!session ? (
        <VStack spacing={4} width="100%">
          <Text fontSize="2xl">Login</Text>
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
          <Input
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          {error && (
            <Box color="red.500">
              <Text>{error}</Text>
            </Box>
          )}
          <Button onClick={handleLogin} isLoading={loading} colorScheme="blue" width="100%">
            Submit
          </Button>
        </VStack>
      ) : (
        <Box>
          <Text fontSize="2xl">Welcome, you are logged in!</Text>
          <Text>This content is only visible to authenticated users.</Text>
        </Box>
      )}
    </Container>
  );
};

export default Index;