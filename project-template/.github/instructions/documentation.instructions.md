- NEVER generate a documentation that i did not be asked for.
- Never summarize the code base modification in an MD file or a document unless i asked for it.
- Follow up documentation workflow as described in /.github/workflows/documentation.workflows.md
- Use documentation task prompt from /.github/tasks/documentation.prompts.md

## Diagram Standards

**📘 For detailed guidance, examples, and best practices, see: [Diagram Usage Guide](/.github/guides/diagram-usage.guide.md)**

### When to Use Mermaid vs PlantUML

**Use Mermaid for:**
- Simple flowcharts and process flows
- Basic entity-relationship diagrams
- Simple class diagrams (few classes, basic relationships)
- Git graphs and timelines
- User journey flows
- Gantt charts

**Use PlantUML for:**
- Complex class diagrams with multiple inheritance, interfaces, and associations
- Detailed UML diagrams (component, deployment, state, activity)
- Sequence diagrams with detailed interactions
- Implementation explanations requiring precise UML notation
- Architecture diagrams with detailed component relationships

### Diagram Best Practices

1. **Always include diagram source code** in markdown code blocks for version control and editing
2. **Choose the right tool** based on diagram complexity and audience
3. **Label all elements** clearly with meaningful names
4. **Add legends** for complex diagrams with many symbols
5. **Reference diagrams** in surrounding text to provide context
6. **Keep diagrams focused** - one concept per diagram
7. **Use consistent notation** across all diagrams in a document

**See [Diagram Usage Guide](/.github/guides/diagram-usage.guide.md) for detailed examples and decision matrices.**
