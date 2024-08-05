import React, { useEffect, useState } from 'react';
import { getEventAnalyticsForPeriod, getEventAnalyticsForDateRange, generateAnalyticsReport } from '../../services/analyticsService';
import { Container, Row, Col, Button, Dropdown, Form } from 'react-bootstrap';
import { Chart, registerables } from 'chart.js';
import Navbari from '../../components/Navbar/Navbar';

Chart.register(...registerables);

const EventAnalyticsPage: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [period, setPeriod] = useState<'Last30Days' | 'Last60Days' | 'Last90Days'>('Last30Days');
  const [customDateRange, setCustomDateRange] = useState<{ startDate: string, endDate: string } | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        let data;
        if (customDateRange) {
          data = await getEventAnalyticsForDateRange(customDateRange.startDate, customDateRange.endDate);
        } else {
          data = await getEventAnalyticsForPeriod(period);
        }
        setAnalyticsData(data);
      } catch (error) {
        console.error('Error fetching analytics data:', error);
      }
    };

    fetchAnalytics();
  }, [period, customDateRange]);

  useEffect(() => {
    if (analyticsData) {
      const ctx = document.getElementById('attendanceChart') as HTMLCanvasElement;
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: analyticsData.attendance?.map((a: any) => a.date) || [],
          datasets: [{
            label: 'Attendance',
            data: analyticsData.attendance?.map((a: any) => a.count) || [],
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
          }]
        },
      });
    }
  }, [analyticsData]);

  const handlePeriodChange = (newPeriod: 'Last30Days' | 'Last60Days' | 'Last90Days') => {
    setPeriod(newPeriod);
    setCustomDateRange(null); 
  };

  const handleDateRangeChange = () => {
    
    if (customDateRange?.startDate && customDateRange.endDate) {
  
    }
  };

  if (!analyticsData) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Navbari />
      <Row>
        <Col>
          <h2>Event Analytics</h2>
          <div>
            <h4>Total Tickets Sold: {analyticsData.sales}</h4>
          </div>
          <div>
            <canvas id="attendanceChart"></canvas>
          </div>
          <div className="mt-3">
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Period: {period}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handlePeriodChange('Last30Days')}>Last 30 Days</Dropdown.Item>
                <Dropdown.Item onClick={() => handlePeriodChange('Last60Days')}>Last 60 Days</Dropdown.Item>
                <Dropdown.Item onClick={() => handlePeriodChange('Last90Days')}>Last 90 Days</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Button className="mt-2" onClick={() => generateAnalyticsReport()}>
              Generate Report
            </Button>
            <Form className="mt-3">
              <Form.Group>
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  type="date"
                  onChange={(e) => setCustomDateRange(prev => ({
                    ...prev!,
                    startDate: e.target.value
                  }))}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>End Date</Form.Label>
                <Form.Control
                  type="date"
                  onChange={(e) => setCustomDateRange(prev => ({
                    ...prev!,
                    endDate: e.target.value
                  }))}
                />
              </Form.Group>
              <Button className="mt-2" onClick={handleDateRangeChange}>
                Apply Custom Date Range
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default EventAnalyticsPage;
