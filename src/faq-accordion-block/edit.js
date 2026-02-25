import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import {
  PanelBody,
  Button,
  TextControl,
  TextareaControl,
  ToggleControl,
  ColorPicker,
} from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// Create a simple, stable id for each FAQ item.
const createFaqId = (suffix = '') =>
  `faq-${Date.now()}-${Math.random().toString(36).slice(2)}${suffix}`;

export default function Edit({ attributes, setAttributes }) {
  const { faqs, activeColor, showSchema } = attributes;
  const blockProps = useBlockProps({ className: 'faq-accordion-editor' });
  const [openIndex, setOpenIndex] = useState(null);

  // Ensure every FAQ has a stable id for drag-and-drop and rendering keys.
  useEffect(() => {
    if (faqs.every((faq) => faq.id)) return;

    const withIds = faqs.map((faq, index) =>
      faq.id ? faq : { ...faq, id: createFaqId(`-${index}`) }
    );
    setAttributes({ faqs: withIds });
  }, [faqs, setAttributes]);

  const addFaq = () => {
    setAttributes({
      faqs: [
        ...faqs,
        { id: createFaqId(), question: '', answer: '' },
      ],
    });
  };

  const updateFaq = (index, field, value) => {
    const updated = faqs.map((faq, i) =>
      i === index ? { ...faq, [field]: value } : faq
    );
    setAttributes({ faqs: updated });
  };

  const removeFaq = (index) => {
    setAttributes({ faqs: faqs.filter((_, i) => i !== index) });
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const reordered = Array.from(faqs);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    setAttributes({ faqs: reordered });
  };

  return (
    <>
      {/* Sidebar Panel */}
      <InspectorControls>
        <PanelBody title={__('Accordion Settings', 'faq-accordion-block')}>
          <ToggleControl
            label={__('Add FAQ Schema Markup', 'faq-accordion-block')}
            checked={showSchema}
            onChange={(val) => setAttributes({ showSchema: val })}
          />
          <p>{__('Active Item Color', 'faq-accordion-block')}</p>
          <ColorPicker
            color={activeColor}
            onChange={(val) => setAttributes({ activeColor: val })}
            enableAlpha={false}
          />
        </PanelBody>
      </InspectorControls>

      {/* Editor UI */}
      <div {...blockProps}>
        <h2 style={{ marginBottom: '16px' }}>
          {__('FAQ Accordion', 'faq-accordion-block')}
        </h2>

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="faq-list">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {faqs.map((faq, index) => (
                  <Draggable
                    key={faq.id}
                    draggableId={faq.id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        style={{
                          border: '1px solid #ddd',
                          borderRadius: '6px',
                          padding: '12px',
                          marginBottom: '10px',
                          background: '#fff',
                          ...provided.draggableProps.style,
                        }}
                      >
                        {/* Drag Handle + Toggle */}
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            marginBottom: '8px',
                          }}
                        >
                          <span
                            {...provided.dragHandleProps}
                            style={{ cursor: 'grab', fontSize: '18px' }}
                            title="Drag to reorder"
                            aria-label={__('Drag to reorder', 'faq-accordion-block')}
                          >
                            ::
                          </span>
                          <strong
                            style={{ flex: 1, cursor: 'pointer' }}
                            onClick={() =>
                              setOpenIndex(openIndex === index ? null : index)
                            }
                          >
                            {faq.question || `FAQ #${index + 1}`}
                          </strong>
                          <Button
                            isDestructive
                            isSmall
                            onClick={() => removeFaq(index)}
                          >
                            x
                          </Button>
                        </div>

                        {/* Expand fields when clicked */}
                        {openIndex === index && (
                          <>
                            <TextControl
                              label={__('Question', 'faq-accordion-block')}
                              value={faq.question}
                              onChange={(val) =>
                                updateFaq(index, 'question', val)
                              }
                            />
                            <TextareaControl
                              label={__('Answer', 'faq-accordion-block')}
                              value={faq.answer}
                              onChange={(val) =>
                                updateFaq(index, 'answer', val)
                              }
                              rows={3}
                            />
                          </>
                        )}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <Button isPrimary onClick={addFaq} style={{ marginTop: '12px' }}>
          {__('+ Add FAQ Item', 'faq-accordion-block')}
        </Button>
      </div>
    </>
  );
}
