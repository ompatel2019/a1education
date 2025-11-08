-- Insert HSC Economics 2025 Solutions blog post

insert into blogs (
  slug,
  blog_header,
  blog_subheading,
  blog_hero,
  blog_tags,
  blog_text,
  blog_context,
  draft
) values (
  'hsc-economics-2025-solutions',
  'HSC Economics 2025 Solutions Released',
  'Full HSC Economics 2025 Solutions now available for class of 2025 students',
  '/blogs/placeholder-a1-blog.svg',
  '["Economics", "HSC", "2025", "Solutions", "Exam Preparation"]'::jsonb,
  '[
    {
      "section_heading": "Solutions Now Available",
      "section_text": "Hey class of 2025 students!\n\nWe''ve just released our full HSC Economics 2025 Solutions. These have been created by the A1 team and if you sat the paper or want to learn how top students structure answers, download the solutions below and use them to refine your exam technique."
    },
    {
      "section_heading": "What''s Included",
      "section_text": "Our comprehensive solutions cover all questions from the 2025 HSC Economics exam paper. Each solution includes detailed explanations, marking criteria breakdowns, and model answers that demonstrate the structure and depth expected by examiners. Whether you''re reviewing your own performance or preparing for future assessments, these solutions provide invaluable insights into exam technique and answer formatting."
    },
    {
      "section_heading": "How to Use These Solutions",
      "section_text": "Start by attempting the questions yourself, then compare your answers with our model solutions. Pay close attention to how top students structure their responses, use economic terminology, and integrate real-world examples. Use these solutions as a learning tool to identify areas for improvement and refine your exam strategy."
    }
  ]'::jsonb,
  '{
    "date": "2025-01-15",
    "author": "A1 Team",
    "readTime": "5 min read"
  }'::jsonb,
  false
)
on conflict (slug) do update set
  blog_header = excluded.blog_header,
  blog_subheading = excluded.blog_subheading,
  blog_hero = excluded.blog_hero,
  blog_tags = excluded.blog_tags,
  blog_text = excluded.blog_text,
  blog_context = excluded.blog_context,
  draft = excluded.draft,
  updated_at = now();

