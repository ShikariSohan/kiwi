import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';

export default function PdfCard({ pdf}: { pdf: any}) {
  return (
    <>
     <Card shadow="sm" padding="lg" radius="md" withBorder sx={{width:"400px"}}>
      <Card.Section>
        <Image
          src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
          height={160}
          alt="Norway"
        />
      </Card.Section>

      
        <Text fw={500}>{pdf.title}</Text>
       

      
 <Group sx={{justifyContent:"space-between"}} mt="md" mb="xs">
 <Button variant="light" color="blue" fullWidth mt="md" radius="md"
 onClick={() => {
    window.open(pdf.url, '_blank');
 }}
 >
        Open Pdf
      </Button>
      <Button variant="light" color="blue" fullWidth mt="md" radius="md"
      onClick={
        () => {
         alert("Playing Audio")
        }
      }
      >
        Play Audio
        </Button>
 </Group>
      
    </Card>
    </>
    
  );
}
