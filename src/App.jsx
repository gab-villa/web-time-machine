import Ratio from 'react-bootstrap/Ratio';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import { useState, useEffect} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { format } from 'date-fns'

function App() {
  //http://archive.org/wayback/available?url=example.com&timestamp=20060101
  const LINK_TO_API = "https://archive.org/wayback/available?";
  const [status, setStatus] = useState('typing');
  const [website, setWebsite] = useState('');
  const [foundSite, setFoundSite] = useState('');
  const [inpDate, setInpDate] = useState('2010-03');

  useEffect(() => {
      async function startWithRandSite()
      {
        setStatus('submitting');
        const allOpc = [
          {url:"spacejam.com",date:"20000300"},
          {url:"hampsterdance.com",date:"20000300"},
          {url:"ebay.com",date:"19990600"},
          {url:"netscape.com",date:"20030300"},
          {url:"pepsi.com",date:"19960700"},
          {url:"lego.com",date:"19970100"},
          {url:"mcdonalds.com/a_welcome",date:"19961100"},
          {url:"apple.com",date:"19980500"},
          {url:"google.com",date:"19981200"},
          {url:"youtube.com",date:"20081200"},
          {url:"thex-files.com",date:"19961000"},
          {url:"cartoonnetwork.com",date:"19991000"},
          {url:"meninblack.com",date:"19981000"},
          {url:"zelda.com",date:"20050300"},
          {url:"blockbuster.com",date:"19961200"},,
          {url:"winamp.com",date:"20041100"},
          {url:"info.cern.ch/hypertext/WWW/TheProject.html",date:"20130400"},
          {url:"windows95.com",date:"19961200"},
          {url:"ibm.com",date:"20001100"},
          {url:"nintendo.com",date:"19961200"},
        ];

        const opc = allOpc[Math.floor(Math.random()*allOpc.length)];
        const res = await fetch(LINK_TO_API + "url=" + opc.url + "&timestamp=" + opc.date);
        const data = await res.json();
        if(data.archived_snapshots.closest.available === true)
        {
          setFoundSite(data.archived_snapshots.closest.url);
        }
        setStatus('typing');
      }
      startWithRandSite();
  }, []);
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
    
    const date = inpDate.replace('-', '') + "00";
    console.log(date);
    setTimeout(async function(){
      const res = await fetch(LINK_TO_API + "url=" + website + "&timestamp=" + date);
      const data = await res.json();
  
      if(data.archived_snapshots.closest.available === true)
      {
        setFoundSite(data.archived_snapshots.closest.url);
      }
      else
      {
        console.log("no se pudo encontrar un sitio en esa fecha!");
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
                          list="datalistOptions" 
                        />
                        <datalist id="datalistOptions">
                          <option value="google.com"> Google </option>
                          <option value="youtube.com"> Youtube </option>
                          <option value="facebook.com"> Facebook</option>
                          <option value="yahoo.com"> Yahoo </option>
                        </datalist>
                      </Col>
                      <Col
                        className="pt-3 pt-sm-3 pt-md-0 "
                        xs={{span:7, order:2}}  
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
                            
                            type="month" 
                          />
                          
                      </Col>
                      <Col 
                        className="text-end pt-3 pt-sm-3 pt-md-0"
                        xs={{span:5, order:3}}
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
