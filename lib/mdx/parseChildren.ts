import { ReactNode, Children, isValidElement } from "react";

export interface ChildParser<T> {
  [key: string]: {
    component: React.FC<{ children: ReactNode }>;
    key: keyof T;
  };
}

export function parseChildren<T extends Record<string, ReactNode>>(children: ReactNode, parsers: ChildParser<T>): T {
  const result = {} as T;

  if (children) {
    Children.forEach(children, (child) => {
      if (isValidElement(child) && typeof child.type === "function") {
        // Check each parser to see if this child matches
        for (const [, parser] of Object.entries(parsers)) {
          if (child.type === parser.component) {
            const childProps = child as React.ReactElement<{ children: ReactNode }>;
            (result as any)[parser.key] = childProps.props.children;
            break;
          }
        }
      }
    });
  }

  return result;
}

// Special parser for nested lists (like ProblemPoints)
export function parseChildrenList(
  parentChildren: ReactNode,
  itemComponent: React.FC<{ children: ReactNode }>
): ReactNode[] {
  const items: ReactNode[] = [];

  if (parentChildren) {
    Children.forEach(parentChildren, (child) => {
      if (isValidElement(child) && child.type === itemComponent) {
        items.push((child as React.ReactElement<{ children: ReactNode }>).props.children);
      }
    });
  }

  return items;
}
