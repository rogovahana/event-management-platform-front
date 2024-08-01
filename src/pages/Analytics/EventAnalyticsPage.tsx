import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getEventAnalytics } from '../../services/analyticsService';
import { Container, Row, Col } from 'react-bootstrap';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const EventAnalyticsPage: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [analyticsData, setAnalyticsData] = useState<any>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const data = await getEventAnalytics(eventId!);
        setAnalyticsData(data);
      } catch (error) {
        console.error('Error fetching analytics data:', error);
      }
    };

    fetchAnalytics();
  }, [eventId]);

  useEffect(() => {
    if (analyticsData) {
      const ctx = document.getElementById('attendanceChart') as HTMLCanvasElement;
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: analyticsData.attendance.map((a: any) => a.date),
          datasets: [{
            label: 'Attendance',
            data: analyticsData.attendance.map((a: any) => a.count),
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
          }]
        },
      });
    }
  }, [analyticsData]);

  if (!analyticsData) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Row>
        <Col>
          <h2>Event Analytics</h2>
          <div>
            <h4>Total Tickets Sold: {analyticsData.totalTicketsSold}</h4>
          </div>
          <div>
            <canvas id="attendanceChart"></canvas>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default EventAnalyticsPage;