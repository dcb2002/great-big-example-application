/* tslint:disable:no-unused-variable */
import { Component, DebugElement, Injectable, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MomentModule } from 'angular2-moment';
import { Subject, Observable } from 'rxjs/Rx';

import { RecipeComponent } from '../../../../../../../main/webapp/app/features/meals/recipe/recipe.component';
import { TimerButtonComponent } from '../../../../../../../main/webapp/app/features/meals/recipe/timer-button/timer-button.component';
import { ApiService } from '../../../../../../../main/webapp/app/core/api/api.service';
import { MockApiService } from '../../../core/api/mock-api.service.spec';
import { GreatBigExampleApplicationSharedModule } from '../../../../../../../main/webapp/app/shared/shared.module';
import { MockRouter } from '../../../../mocks/mock-router.spec';

@Injectable()
class MockActivatedRoute {
    snapshot = {
        params: {
            slug: 'test-slug-1'
        }
    };
}

describe('RecipeComponent', () => {
    let component: RecipeComponent;
    let fixture: ComponentFixture<RecipeComponent>;
    const mockActivatedRoute = new MockActivatedRoute();
    const mockApiService = new MockApiService();
    let mockRouter: MockRouter;
    beforeEach(async(() => {
        mockRouter = new MockRouter();
        TestBed.configureTestingModule({
            imports: [MomentModule, GreatBigExampleApplicationSharedModule],
            declarations: [
                RecipeComponent,
                TimerButtonComponent
            ],
            providers: [
                { provide: ActivatedRoute, useValue: mockActivatedRoute },
                { provide: ApiService, useValue: mockApiService },
                { provide: Router, useValue: mockRouter }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RecipeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set a recipe for the route', done => {
        const testEvent = new NavigationEnd(1, '/test', '/test');
        mockRouter.fakeEvent(testEvent);
        component.recipe.subscribe(recipe => {
            expect(recipe.id).toBe(2);
            done();
        });
    });

    it('should not set the current route if not an instance of NavigationEnd', () => {
        const testEvent = { id: 1, url: '/test', urlAfterRedirect: '/test' };
        mockRouter.fakeEvent(testEvent);
        expect(component.recipe).toBe(undefined);
    });
});
