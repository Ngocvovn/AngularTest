import { HeroesComponent } from './heroes.component';
import { of } from 'rxjs';

describe('HeroesComponent', () => {
    let component: HeroesComponent;

    let HEROES;
    let mockHeroServices;

    beforeEach(() => {
        HEROES = [{
            id: 1,
            name: 'a',
            strength: 8
        }, {
            id: 2,
            name: 'b',
            strength: 1
        }, {
            id: 3,
            name: 'c',
            strength: 6
        }];
        mockHeroServices = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);
        component = new HeroesComponent(mockHeroServices);

    });

    describe('delete', () => {
        it('should remove the indicated hero from the heroes list', () => {
            component.heroes = HEROES;
            mockHeroServices.deleteHero.and.returnValue(of(true));
            component.delete(HEROES[2]);
            expect(component.heroes.length).toBe(2);
        });
    });
});