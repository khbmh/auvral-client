function Faq() {
  const faqs = [
    {
      question:
        'How do I add a new artifact to the Historical Artifacts Tracker?',
      answer:
        "To add a new artifact, follow these steps:\n1. Log in or Register if you don't have an account.\n2. Navigate to the Add Artifact page from the navbar.\n3. Fill out the form with details like artifact name, image URL, type, historical context, and more.\n4. Click the Add Artifact button to submit the form.\n5. A success message will confirm that your artifact has been added.",
    },
    {
      question: 'How can I view details about a specific artifact?',
      answer:
        'To view details about an artifact:\n1. Go to the All Artifacts page.\n2. Click on the artifact card you are interested in.\n3. You will be redirected to the artifact details page, where you can find comprehensive information about the artifact.',
    },
    {
      question: 'Can I like an artifact on the platform?',
      answer:
        'Yes, you can like an artifact if you are logged in. Follow these steps:\n1. Navigate to the artifact details page.\n2. Click the Like Artifact button.\n3. The like count will increase, and the button will be disabled, indicating that you have liked the artifact.',
    },
    {
      question: 'How do I manage the artifacts I have added?',
      answer:
        'To manage your added artifacts:\n1. Log in to your account.\n2. Navigate to the My Added Artifacts page.\n3. Here, you can view all the artifacts you have added.\n4. Use the Update button to edit an artifact entry or the Delete button to remove it.',
    },
    {
      question: 'Can I see the artifacts I have liked?',
      answer:
        'Yes, you can view the artifacts you have liked by following these steps:\n1. Log in to your account.\n2. Navigate to the My Loved Artifacts page.\n3. Here, you will find a list of all the artifacts you have liked.',
    },
    {
      question:
        'What should I do if I find incorrect information about an artifact?',
      answer:
        'If you find incorrect information:\n1. Log in to your account.\n2. Navigate to the artifact details page.\n3. Use the Update button to edit the artifact details.\n4. Submit the updated information, and it will be reflected in the database.',
    },
  ];
  return (
    <div className="container mx-auto px-4 lg:w-[70vw] my-16">
      <h1 className="text-3xl lg:text-5xl text-center font-bold my-8">
        Frequently Asked Questions
      </h1>
      {faqs.map((faq, id) => (
        <div key={id} className="collapse collapse-arrow my-3 border">
          <input type="radio" name="my-accordion-2" defaultChecked />
          <div className="collapse-title text-xl font-medium">
            <h2>{faq.question}</h2>
          </div>
          <div className="collapse-content">
            <p>{faq.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Faq;
