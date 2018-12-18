import { MessageService } from './message.service';

describe('MessageService', () => {
    let service: MessageService;

    beforeEach(() => {
        service = new MessageService();

    });

    it('should have no messages at the beginning', () => {
        expect(service.messages.length).toBe(0);
    });

    it('should add a message when add is called', () => {
        service.add('message');
        expect(service.messages.length).toBe(1);
    });
});