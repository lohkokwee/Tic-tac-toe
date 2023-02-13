import {
  Box,
  Container,
  Title,
  Text
} from '@mantine/core';

interface HeroTextProps {
  subtitle?: boolean
  hasMarginBottom?: boolean
}

const HeroText = ({
  subtitle = false,
  hasMarginBottom = true 
}: HeroTextProps) => {

  const renderTitle = () => {
    return (
      <Container mb={5} px={0}>
        <Title align='center' order={1}>TIC TAC TOE</Title>
      </Container>
    );
  }

  const renderSubtitle = () => {
    return (
      <Container px={0}>
        <Text align='center'>An accessibility focused board game.</Text>
      </Container>
    );
  }

  return (
    <Box mb={hasMarginBottom ? "xl" : ""}>
      {renderTitle()}
      {subtitle && renderSubtitle()}
    </Box>
  )
}

export default HeroText