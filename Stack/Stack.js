import LinkedList from '../LinkedList/LinkedList';

export default class Stack {
    constructor() {
        this.linkedList = new LinkedList();
    }

    // 빈 스택인지 확인(스택은 항상 헤드부터 push되기떄문에 head와 비교)
    isEmpty() {
        return !this.linkedList.head;
    }

    // 스택에서 가장 최근 요소의 값 반환
    peek() {
        if (this.isEmpty()) {
            return null;
        }

        return this.linkedList.head.value;
    }

    // 스택은 입력된 요소가 가장 최근요소가 되어야하기때문에 prepand
    push(value) {
        this.linkedList.prepand(value);
    }

    // 삭제시 가장 최근 요소가 삭제되어야하기 떄문에 head의 값을 삭제한다
    pop() {
        const removeHead = this.linkedList.deleteHead();
        return removeHead ? removeHead.value : null;
    }

    toArray() {
        return this.linkedList.toArray().map((linkedListNode) => linkedListNode.value);
    }

    toString(callback) {
        return this.linkedList.toString(callback);
    }
}