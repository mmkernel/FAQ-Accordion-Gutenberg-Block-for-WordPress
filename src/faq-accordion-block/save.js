import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
  const { faqs, activeColor, showSchema } = attributes;
  const blockProps = useBlockProps.save({ className: 'faq-accordion' });

  return (
    <div {...blockProps} data-active-color={activeColor}>
      {/* FAQ Schema */}
      {showSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: faqs.map((faq) => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: faq.answer,
                },
              })),
            }),
          }}
        />
      )}

      {/* FAQ Items */}
      {faqs.map((faq, index) => (
        <div key={index} className="faq-item">
          <button
            className="faq-question"
            aria-expanded="false"
            aria-controls={`faq-answer-${index}`}
          >
            <span>{faq.question}</span>
            <span className="faq-icon">+</span>
          </button>
          <div
            id={`faq-answer-${index}`}
            className="faq-answer"
            hidden
          >
            <p>{faq.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}