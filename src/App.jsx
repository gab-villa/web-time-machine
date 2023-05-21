import Ratio from 'react-bootstrap/Ratio';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { format } from 'date-fns'

function App() {
  //http://archive.org/wayback/available?url=example.com&timestamp=20060101
  const LINK_TO_API = "http://archive.org/wayback/available?";
  const [status, setStatus] = useState('typing');
  const [website, setWebsite] = useState('');
  const [foundSite, setFoundSite] = useState('');
  const [inpDate, setInpDate] = useState('');

  function parseStrToDate(input) {
    var parts = input.match(/(\d+)/g);
    // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
    return new Date(parts[0], parts[1], parts[2]); // months are 0-based
  }
  function parseDateToISO(longDate)
  {
    return longDate.toISOString().split('T')[0];
  }
  function handleSubmit(e)
  {
    e.preventDefault();
    setStatus('submitting');
    const date = inpDate.replace(/-/g, '');
    
    setTimeout(async function(){
      const res = await fetch(LINK_TO_API + "url=" + website + "&timestamp=" + date);
      const data = await res.json();
      console.log(data);
      if(data.archived_snapshots.closest.available === true)
      {
        setFoundSite(data.archived_snapshots.closest.url);
      }
      setStatus('typing');
    }, 4000);
  }
  function handleInputWebChange(e)
  {
    setWebsite(e.target.value);
  }
  function handleInputDateChange(e)
  {
    console.log(e.target.value);
    setInpDate(e.target.value);
  }
  return (
    <Container className="px-0" fluid>
        <Card>
          <Card.Header as="h4">
            WebTimeMachine
          </Card.Header>
          <Card.Body>
            <Container fluid>
                <Form onSubmit={handleSubmit}>
                    <Row className="align-items-end">
                      <Col 
                        className="pt-1 pt-sm-0"
                        xs={{span:12, order:1}} 
                        sm={{span:12, order:1}} 
                        md={{span:7, order:1}} 
                      >
                        <Form.Label>Type a website</Form.Label>
                        <Form.Control
                          required
                          disabled={status === "submitting"}
                          value={website}
                          onChange={handleInputWebChange}
                          size="lg"
                          type="text"
                          placeholder="Ex: www.google.com"
                          aria-label="Ex: www.google.com"
                          aria-describedby="basic-addon2"
                        />
                      </Col  >
                      <Col
                        className="pt-3 pt-sm-3 pt-md-0 "
                        xs={{span:6, order:2}}  
                        sm={{span:6, order:2}}
                        md={{span:3, order:2}}
                        lg={{span:3, order:2}}
                        xl={{span:2, order:2}}
                      >
                          <Form.Label>Travel to</Form.Label>
                          <Form.Control
                            required
                            disabled={status === "submitting"}
                            value={inpDate}
                            onChange={handleInputDateChange}
                            size="lg"
                            type="date" 
                          />
                      </Col>
                      <Col 
                        className="text-end pt-3 pt-sm-3 pt-md-0"
                        xs={{span:6, order:3}}
                        sm={{span:6, order:3}}
                        md={{span:2, order:3}}
                        lg={{span:2, order:2}}
                        xl={{span:2, order:2, offset:1}}
                      >
                          <Button 
                            
                            size="lg"
                            type="submit"
                            disabled={website.length === 0 ||
                                      status === "submitting"}
                            
                            variant="success" 
                            aria-controls="collapse-result"
                            aria-expanded={status === 'typing'}
                            >
                            Travel!
                          </Button>
                              
                        </Col>
                      </Row>
                  </Form>
            </Container>
          </Card.Body>
          </Card>
      
      <Row className="mx-0">
        <Col className="px-0">
          <Ratio aspectRatio="21x9">
          <iframe src={foundSite} title="timemachine"></iframe>
          </Ratio>
        </Col>
      </Row>
    </Container>
    //http://web.archive.org/web/20060101110226/http://www.facebook.com:80/
  );
}

export default App
