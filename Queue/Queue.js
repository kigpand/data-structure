import LinkedList from '../LinkedList';

export default class Queue {
    constructor() {
        // linkedlist 객체 생성
        this.linkedList = new LinkedList();
    }

    // queue가 비었는지 check
    isEmpty() {
        return !this.linkedList.head;
    }

    // 제일 처음의 값 반환
    peek() {
        if (this.isEmpty()) {
            return null;
        }

        return this.linkedList.head.value;
    }

    // queue에 value값 추가
    enqueue(value) {
        this.linkedList.append(value);
    }

    // queue에 가장 먼저 추가된 값 삭제. linkedlist에서 head에 값 삭제하면 가장 나중의 값이 삭제된 것.
    dequeue() {
        const removedHead = this.linkedList.deleteHead();
        return removedHead ? removedHead.value : null;
    }

    // string값 변환
    toString(callback) {
        return this.linkedList.toString(callback);
    }
}