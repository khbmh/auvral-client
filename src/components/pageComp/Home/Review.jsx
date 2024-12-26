function Review() {
  const reviews = [
    {
      name: 'Robert Brown',
      img: 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?q=80&w=1776&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      profession: 'Museum Curator',
      review:
        'This platform is a must-have for anyone passionate about history. It simplifies the process of tracking and learning about artifacts from around the world.',
    },
    {
      name: 'William Davis',
      img: 'https://images.unsplash.com/photo-1482961674540-0b0e8363a005?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      profession: 'History Teacher',
      review:
        'The Historical Artifacts Tracker is an excellent resource for teaching history. The interactive features and detailed information engage students and make learning fun.',
    },
    {
      name: 'John Doe',
      img: 'https://images.unsplash.com/photo-1597969892064-a7b26a98c335?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      profession: 'History Enthusiast',
      review:
        'The Historical Artifacts Tracker is an incredible tool for exploring and learning about ancient artifacts. The detailed descriptions and images make history come alive!',
    },
    {
      name: 'James Wilson',
      img: 'https://images.unsplash.com/photo-1521132293557-5b908a59d1e1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      profession: 'Researcher',
      review:
        'This platform has significantly improved my research process. The ability to track and manage artifact entries is incredibly useful for my work in historical studies.',
    },
    {
      name: 'Michael Smith',
      img: 'https://images.unsplash.com/photo-1597612041762-93a90e22af06?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      profession: 'Archaeologist',
      review:
        'This platform is a game-changer for archaeologists like me. The ability to track and manage artifact entries is incredibly useful for research and documentation.',
    },
    {
      name: 'David Johnson',
      img: 'https://images.unsplash.com/photo-1556474835-b0f3ac40d4d1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      profession: 'History Student',
      review:
        'The Historical Artifacts Tracker has been a lifesaver for my studies. The comprehensive details and historical context provided for each artifact are invaluable.',
    },
  ];

  return (
    <div className="container mx-auto w-[70vw] my-16">
      <h1 className="text-3xl lg:text-5xl text-center font-bold my-8">
        What Our Users Say About Us
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-between flex-grow">
        {reviews.map((review) => (
          <div key={review.name} className="mid p-4 rounded-lg">
            <div className="flex items-center space-x-4">
              <img
                src={review.img}
                alt={review.name}
                className="w-14 h-14 rounded-full object-cover"
              />
              <div>
                <h3 className="text-lg font-semibold">{review.name}</h3>
                <p className="text-sm">{review.profession}</p>
              </div>
            </div>
            <p className="mt-3">{review.review}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Review;
