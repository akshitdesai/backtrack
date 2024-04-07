# Script to addd dummy data to show the graphs on the frontend
def generate_dummy_data():
    start_date = datetime.now() - timedelta(days=7)
    dummy_data = []

    for i in range(8):
        # Generate 3 to 4 entries per day
        for _ in range(random.randint(3, 4)):
            start_time = start_date.replace(hour=random.randint(0, 23), minute=random.randint(0, 59), second=random.randint(0, 59))
            end_time = start_time + timedelta(minutes=random.randint(30, 120))
            duration = (end_time - start_time).seconds
            good_posture = random.randint(70, 100)
            dummy_data.append({
                'start_time': start_time,
                'end_time': end_time,
                'duration': duration,
                'good_posture': good_posture
            })

        start_date += timedelta(days=1)

    return dummy_data

# Dummy data for last 7 days
dummy_data = generate_dummy_data()

def upgrade():
    for data in dummy_data:
        op.execute(
            f"INSERT INTO stream (id, start_time, end_time, duration, good_posture) VALUES ('{str(uuid.uuid4())}', '{data['start_time']}', '{data['end_time']}', {data['duration']}, {data['good_posture']})"
        )